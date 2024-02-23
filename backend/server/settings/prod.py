# 本番環境用設定

from .base import *
import os

# 本番環境化
DEBUG = False
DJANGO_VITE_DEV_MODE = False
ALLOWED_HOSTS = ['*']  # FIXME 本番環境ではワイルドカードは危険

SECRET_KEY = env.get_value('DJANGO_SECRET_KEY')

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.mysql',
        # PlanetScaleでは外部キー制約をサポートしていないため、専用のDBラッパーを使う必要がある
        'ENGINE': 'django_psdb_engine',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASS'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT') or 3306,
        'OPTIONS': {'ssl': {'ca': os.environ.get('MYSQL_ATTR_SSL_CA')}}
    }

}

# Gmailの設定　下の参考を確認すること
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True

LOGGING = {
    'disable_existing_loggers': False,
    'version': 1,
    'handlers': {
        'console': {
            # logging handler that outputs log messages to terminal
            'class': 'logging.StreamHandler',
            #             'level': 'DEBUG',  # message level to be written to console
            'level': 'INFO',  # message level to be written to console
        },
    },
    'loggers': {
        '': {
            # this sets root level logger to log debug and higher level
            # logs to console. All other loggers inherit settings from
            # root level logger.
            'handlers': ['console'],
            #             'level': 'DEBUG',
            'level': 'INFO',
            'propagate': False,  # this tells logger to send logging message
            # to its parent (will send if set to True)
        },
        'django.db': {
            # django also has database level logging
            'handlers': ['console'],
            'level': 'INFO',
            #             'level': 'DEBUG',
            'propagate': False,
        },
    },
}
