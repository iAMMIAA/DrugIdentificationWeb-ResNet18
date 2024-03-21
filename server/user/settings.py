from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ke3f6i447oj3ap6w3oh&7fm#fzm5br5^k!80#p*2ty1^30s=wp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'account',
    'corsheaders',
    'bootstrap4',
    # 'django_rest_passwordreset',
    # 'account.apps.AccountConfig',
    # 'knox',
]

CORS_ORIGIN_ALLOW_ALL = True


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
]

ROOT_URLCONF = 'user.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [BASE_DIR, 'templates/',],
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'user.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

#Data define
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# import pymysql
# pymysql.install_as_MySQLdb()
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'userAndDrug', # the name of database
#         'USER': 'root',
#         'PASSWORD': 'i.AMMIAK16',
#         'HOST': 'localhost',
#         'PORT': '3306'
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'account.CustomUser'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        # 'knox.auth.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    # Other settings...
}


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

CORS_ORIGIN_WHITELIST = [
    # 'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5025',
    'http://127.0.0.1:5501',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
        # Thêm nguồn gốc của trang web client
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

STATICFILES_DIRS = [BASE_DIR / "static"]

# APPEND_SLASH=False


# Email Backend Configuration
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'  # Replace with your preferred backend

# EMAIL_PORT = 587  # Replace with your email port
# EMAIL_USE_TLS = True  # Set to False if your email server doesn't use TLS
# EMAIL_HOST = 'your_email_host'  # Replace with your email host for gmail -> 'smtp.gmail.com'
# EMAIL_HOST_USER = 'your_email_username'  # Replace with your email username
# EMAIL_HOST_PASSWORD = 'your_email_password'  # Replace with your email password