from rest_framework import serializers

from .models import Thread, QuestionAndAnswer


class ThreadCrudSerializer(serializers.ModelSerializer):
    """
    スレッドの新規投稿、編集、削除
    """
    class Meta:
        model = Thread
        fields = ['id',  'title']


class ThreadListSerializer(serializers.ModelSerializer):
    """
    ユーザー毎のスレッドの一括取得
    """
    class Meta:
        model = Thread
        fields = ['id', 'user', 'title']


class QuestionAndAnswerCrudSerializer(serializers.ModelSerializer):
    """
    質問と回答の新規投稿、編集、削除
    """
    class Meta:
        model = QuestionAndAnswer
        fields = ['id', 'thread', 'question', 'answer']


class QuestionAndAnswerListSerializer(serializers.ModelSerializer):
    """
    質問と回答の新規投稿、編集、削除
    """
    class Meta:
        model = QuestionAndAnswer
        fields = ['id', 'user', 'thread', 'question', 'answer']
