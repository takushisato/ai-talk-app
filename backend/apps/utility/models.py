from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    """
    全モデルで共通で利用するフィールドを持つベースクラス
    """
    created_at = models.DateTimeField('作成日時', default=timezone.now)
    updated_at = models.DateTimeField('更新日時', auto_now=True, null=True)

    class Meta:
        abstract = True


class ImageBaseModel(BaseModel):
    """
    画像を管理するためのベースクラス
    """
    image = models.ImageField('イメージ')
    sort_order = models.IntegerField('並び順', default=0)

    class Meta:
        abstract = True

    def __str__(self):
        if self.image.url is not None and self.image.url != '':
            return '{}: {}'.format(self.id, self.image)
        else:
            return '{}: {}'.format(self.id, 'no image')
