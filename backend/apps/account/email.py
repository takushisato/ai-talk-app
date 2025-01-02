# from multiprocessing import context
from django.contrib.auth.tokens import default_token_generator
from djoser import utils
from templated_mail.mail import BaseEmailMessage
from django.conf import settings

class EmailManager(BaseEmailMessage):
    """
    emailのベースクラス
    """
    def send(self, to, *args, **kwags):
        self.render()
        self.to = to
        self.cc = kwags.pop('cc', [])
        self.bcc = kwags.pop('bcc', [])
        self.reply_to = kwags.pop('replay_to', [])
        self.from_email = kwags.pop(
            'from_email',
            'farmee <' + settings.DEFAULT_FROM_EMAIL + '>'
        )
        super(BaseEmailMessage, self).send(*args, **kwags)

class ActivationEmail(EmailManager):
    """
    新規会員登録後のアクティベートメール
    """
    template_name = 'account/activation.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER["ACTIVATION_URL"].format(**context)
        return context

class ConfirmationEmail(EmailManager):
    """
    アクティベート完了メール
    """
    template_name = 'account/confirmation.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        return context

class PasswordResetEmail(BaseEmailMessage):
    """
    パスワード変更リクエストメール
    """
    template_name = 'account/password_reset.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER["PASSWORD_RESET_CONFIRM_URL"].format(**context)
        return context

class PasswordChangedConfirmationEmail(BaseEmailMessage):
    """
    パスワード変更完了メール
    """
    template_name = 'account/password_changed_confirmation.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        return context

class UsernameResetEmail(BaseEmailMessage):
    """
    メールアドレス変更リクエストメール
    """
    template_name = 'account/username_reset.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER["USERNAME_RESET_CONFIRM_URL"].format(**context)
        return context

class UsernameChangedConfirmationEmail(BaseEmailMessage):
    """
    メールアドレス変更完了メール
    """
    template_name = 'account/username_changed_confirmation.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        return context
