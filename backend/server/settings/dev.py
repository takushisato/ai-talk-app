# 開発環境用の設定

from .base import *
import os

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'server/service_db.sqlite3',
    }
    # 'default': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': os.environ.get('DB_NAME') or 'ai_talk',
    #     'USER': os.environ.get('DB_USER') or 'dev',
    #     'PASSWORD': os.environ.get('DB_PASS') or 'pass',
    #     'HOST': os.environ.get('DB_HOST') or 'mysql',
    #     'PORT': os.environ.get('DB_PORT') or 3306,
    # }
}

# Gmailの設定　下の参考を確認すること
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_HOST_USER = env('EMAIL_HOST_USER')
# EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# 参考　Gmailデフォルトのままだと送信者名が自分になってしまうので、Gmail側の設定変更が必要
# https://teratail.com/questions/253071
# https://zenn.dev/wtkn25/articles/django-gmail

# LOGGING = {
#     'disable_existing_loggers': False,
#     'version': 1,
#     'handlers': {
#         'console': {
#             # logging handler that outputs log messages to terminal
#             'class': 'logging.StreamHandler',
#             'level': 'DEBUG',  # message level to be written to console
#             # 'level': 'INFO',  # message level to be written to console
#         },
#     },
#     'loggers': {
#         '': {
#             # this sets root level logger to log debug and higher level
#             # logs to console. All other loggers inherit settings from
#             # root level logger.
#             'handlers': ['console'],
#             'level': 'DEBUG',
#             'propagate': False,  # this tells logger to send logging message
#             # to its parent (will send if set to True)
#         },
#         'django.db': {
#             # django also has database level logging
#             'handlers': ['console'],
#             'level': 'DEBUG',
#             'propagate': False,
#         },
#     },
# }

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
]
