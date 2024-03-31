import requests
from rest_framework import viewsets, generics
from rest_framework.permissions import (
    IsAuthenticated,
)

from server.settings.permissions import IsOwnerOnly
from .models import Thread, QuestionAndAnswer
from .serializers import ThreadCrudSerializer, ThreadListSerializer, QuestionAndAnswerCrudSerializer, \
    QuestionAndAnswerListSerializer
from apps.utility.utils import chat_gpt, create_prompt

"""
スレッドの新規投稿、編集、削除

perform_createでユーザーをトークンから選定する様にしています
"""
class ThreadCrud(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    serializer_class = ThreadCrudSerializer
    permission_classes = [IsOwnerOnly, IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


"""
ユーザー毎のスレッドの一括取得

リクエストヘッダのトークンからユーザーを選定し、そのユーザーの作成したスレッドを一括で返します
"""
class ThreadList(generics.ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadListSerializer
    permission_classes = [IsOwnerOnly, IsAuthenticated]

    def get_queryset(self):
        pk = self.request.user.id
        return Thread.objects.all().filter(user=pk).order_by('updated_at').reverse()


"""
質問と回答の新規投稿、編集、削除
"""
class QuestionAndAnswerCrud(viewsets.ModelViewSet):
    queryset = QuestionAndAnswer.objects.all()
    serializer_class = QuestionAndAnswerCrudSerializer
    permission_classes = [IsOwnerOnly, IsAuthenticated]

    def perform_create(self, serializer):
        question = self.request.data['question']
        if question:
            # Chat-GPTに投げる命令文を生成
            prompt = create_prompt(question, "oder_sheet.txt")
            # Chat-GPTへリクエストを投げる
            response = chat_gpt(prompt)
            if response:
                # ChatGPTから返答があった場合
                context = {'input_text': question,
                           'response': response,
                           }
                serializer.save(
                    user=self.request.user,
                    question=question,
                    thread_id=self.request.data['thread'],
                    answer=context['response']
                )
            else:
                # ChatGPTから返答が無かった場合はreturnで処理を終える
                return


"""
スレッド毎にAIとのやり取りを一括取得

"""
class QuestionAndAnswerList(generics.ListAPIView):
    queryset = QuestionAndAnswer.objects.all()
    serializer_class = QuestionAndAnswerListSerializer
    permission_classes = [IsAuthenticated]
    # TODO
    # ここではIsOwnerOnlyが効かない。理由を調べること。取り合えずfilter(user=user)で代用
    # permission_classes = [IsOwnerOnly, IsAuthenticated]

    def get_queryset(self):
        pk = self.kwargs['pk']
        user = self.request.user.id
        return QuestionAndAnswer.objects.all().filter(thread_id=pk).filter(user=user).order_by('updated_at').reverse()
