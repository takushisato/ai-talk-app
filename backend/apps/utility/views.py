from rest_framework.response import Response
from rest_framework import status
from djoser.views import TokenCreateView
from djoser import utils
from djoser.conf import settings

class CustomTokenCreateView(TokenCreateView):
    """
    ログインする度に認証トークンを再作成するクラス

    このクラスを使用する事で毎ログイン時に、認証トークンを更新する事ができます
    """

    def _action(self, serializer):
        user = serializer.user

        # 作成済みのトークンがあれば取得して削除
        old_token = utils.login_user(self.request, serializer.user)
        if old_token:
            old_token.delete()

        # 新しいトークンを作成
        token, _ = settings.TOKEN_MODEL.objects.get_or_create(user=user)
        token_serializer_class = settings.SERIALIZERS.token
        return Response(
            data=token_serializer_class(token).data, status=status.HTTP_200_OK
        )
