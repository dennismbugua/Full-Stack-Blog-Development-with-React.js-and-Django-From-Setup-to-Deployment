from rest_framework import serializers
from .models import Post


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        # fields = ('id', 'title', 'post', 'author', 'authorImage', 'aboutAuthor', 'dateTime', 'category', 'image')
        fields = '__all__'
        # lookup_field = 'slug'