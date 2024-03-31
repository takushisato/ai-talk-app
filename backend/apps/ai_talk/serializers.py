from rest_framework import serializers

from .models import Thread, QuestionAndAnswer


"""
スレッドの新規投稿、編集、削除
"""
class ThreadCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ['id',  'title']


"""
ユーザー毎のスレッドの一括取得
"""
class ThreadListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ['id', 'user', 'title']


"""
質問と回答の新規投稿、編集、削除
"""
class QuestionAndAnswerCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAndAnswer
        fields = ['id', 'thread', 'question', 'answer']


"""
質問と回答の新規投稿、編集、削除
"""
class QuestionAndAnswerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAndAnswer
        fields = ['id', 'user', 'thread', 'question', 'answer']
