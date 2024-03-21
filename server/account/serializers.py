# accounts/serializers.py
from rest_framework import serializers
from .models import CustomUser
from .models import drug

class drugSerializer(serializers.ModelSerializer):
    class Meta:
        model = drug
        fields = ('idDrug', 'codeUser', 'name', 'picture')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'fullname', 'phonenumber', 'age', 'profession', 'gender', 'location']
        extra_kwargs = {'password': {'write_only': True}}

    #This function is used for client register.
    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    #This function is used for updating the personal information after successfully register.
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.fullname = validated_data.get('fullname', instance.fullname)
        instance.phonenumber = validated_data.get('phonenumber', instance.phonenumber)
        instance.age = validated_data.get('age', instance.age)
        instance.profession = validated_data.get('profession', instance.profession)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.location = validated_data.get('location', instance.location)

        password = validated_data.get('password')
        if password:
            instance.set_password(password)

        instance.save()
        return instance

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)