from PIL import Image
import torch
import torchvision.transforms as transforms
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import drugSerializer, UserSerializer, ChangePasswordSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import drug, CustomUser
from django.contrib.auth import update_session_auth_hash                                                               

@api_view(['GET'])
def account(request):
        return render(request, 'intro.html')

@api_view(['GET'])
def user(request):
        return render(request, 'user.html')

@api_view(['GET'])
def home(request):
        return render(request, 'home.html')

@api_view(['GET'])
def prescription(request):
        return render(request, 'prescription.html')

@api_view(['GET'])
def settings(request):
        return render(request, 'settings.html')

@api_view(['GET'])
def about(request):
        return render(request, 'about.html')

@api_view(['GET'])
def view_list(request):
    if request.method == 'GET':
        list_acc = CustomUser.objects.all()
        serializer = UserSerializer(list_acc, many = True)
        return Response(serializer.data)

#API_User
#Register
@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Login
@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = None
        if '@' in username:
            try:
                user = CustomUser.objects.get(email=username)
            except ObjectDoesNotExist:
                pass

        if not user:
            user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def user_login(request):
#     if request.method == 'POST':
#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             serializer = UserSerializer(user)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
  
#Update individual information of user
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated]) #To ensure user logined
def update_individual_info(request):
    user = request.user #The user who is logining
    if request.method == 'GET':
          serializer = UserSerializer(user)
          return Response(serializer.data)
    elif request.method == 'PUT':
         serializer = UserSerializer(user, data = request.data, partial = True)
         if serializer.is_valid():
              serializer.save()
              return Response(serializer.data)
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#Password Change Endpoint
@api_view(['POST'])
@permission_classes([IsAuthenticated]) #To ensure the user logined
def change_password(request):
    if request.method == 'POST':
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get('old_password')):
                user.set_password(serializer.data.get('new_password'))
                user.save()
                update_session_auth_hash(request, user)  # To update session after password change
                return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#Logout
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# @api_view(['DELETE'])
# def drugDelete(request, pk):
#     deleteDrug = drug.objects.get(id = pk)
#     deleteDrug.delete()
#     return Response('Item successfully delete!')        
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request, idUser):
     delete_user = CustomUser.objects.get(id = idUser)
     delete_user.delete()
     return Response('Successfully delete patient!');

#API_DRUG
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Overview API:' '/list/', #GET
        'Detail View:' '/detail/<str:pk>', #GET-detail
        'Create: ' '/create/', #POST
        'Update: ' '/update/<str:pk>/', #PUT
        'Delete: ' '/delete/<str:pk>/', #DELETE
    }
    return Response(api_urls)

#Get all info
@api_view(['GET'])
def drugList(request):
    list_drug = drug.objects.all()
    serializer = drugSerializer(list_drug, many = True)
    return Response(serializer.data)

#Get detail
@api_view(['GET'])
def drugDetail(request, pk):
    try:
        list_drug = drug.objects.get(idDrug=pk)
        serializer = drugSerializer(list_drug, many=False)
        return Response(serializer.data)
    except drug.DoesNotExist:
        return Response("Drug not found.", status=status.HTTP_404_NOT_FOUND)

# create
@api_view(['POST'])
def drugCreate(request):
    image_file = request.FILES['image']
    drug_name = detect_drug(image_file)
    serializer = drugSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(name=drug_name, picture=image_file)
    return Response(serializer.data)

# update drug img
@api_view(['POST'])
def drugUpdate(request, pk):
    updateDrug = drug.objects.get(id = pk)
    serializer = drugSerializer(instance = updateDrug, data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#delete the pill
@api_view(['GET'])
def drugDelete(request, pk):
    deleteDrug = drug.objects.get(id = pk)
    deleteDrug.delete()
    return Response('Item successfully delete!')

def detect_drug(image):
    resnet = torch.load('ResNet18.pth', map_location=torch.device('cpu'))
    resnet.eval()

    transform = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                                 std=[0.229, 0.224, 0.225]),
        ])

    image = Image.open(image)
    image = transform(image).unsqueeze(0)

    output = resnet(image)
    _, predicted_idx = torch.max(output, 1)
    classes = ['3B-Medi', 'Agifamcin', 'Agifovir', 'Alpha-Choay',
               'Alprazolam-Mylam', 'Ambron', 'Ameflu-Daytime',
               'Amlodipin', 'Apha-Bevagyl', 'Arcalion']
    drug_name = classes[predicted_idx]
    return drug_name
