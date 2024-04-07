# from multiprocessing import context
from django.contrib.auth.tokens import default_token_generator
from djoser import utils
from templated_mail.mail import BaseEmailMessage
from django.conf import settings

class EmailManager(BaseEmailMessage):
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

# 新規会員登録後のアクティベートメール
class ActivationEmail(EmailManager):
    template_name = 'account/activation.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER["ACTIVATION_URL"].format(**context)
        return context

# アクティベート完了メール
class ConfirmationEmail(EmailManager):
    template_name = 'account/confirmation.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        return context

# パスワード変更リクエストメール
class PasswordResetEmail(BaseEmailMessage):
    template_name = 'account/password_reset.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER["PASSWORD_RESET_CONFIRM_URL"].format(**context)
        return context

# パスワード変更完了メール
class PasswordChangedConfirmationEmail(BaseEmailMessage):
    template_name = 'account/password_changed_confirmation.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        return context

# メールアドレス変更リクエストメール（モデルを変更しているためユーザーネームではない）
class UsernameResetEmail(BaseEmailMessage):
    template_name = 'account/username_reset.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER["USERNAME_RESET_CONFIRM_URL"].format(**context)
        return context

# メールアドレス変更完了メール（モデルを変更しているためユーザーネームではない）
class UsernameChangedConfirmationEmail(BaseEmailMessage):
    template_name = 'account/username_changed_confirmation.html'

    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.name
        return context
