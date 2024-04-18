from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from requests import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.core.mail import send_mail
from django.db.models import Count
from backend.models import Post
from taggit.models import Tag
from .serializers import BlogSerializer
# from .forms import EmailPostForm, CommentForm, SearchForm
from dataclasses import fields
from rest_framework import serializers
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.db import models

now = timezone.now()  # get the current time

class PostListView(ListAPIView):
    queryset = Post.published.all()
    serializer_class = BlogSerializer


class BlogDetailView(RetrieveAPIView):
    queryset = Post.published.all()
    serializer_class = BlogSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )


class BlogFeaturedView(ListAPIView):
    queryset = Post.objects.all().filter(featured=True)
    serializer_class = BlogSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )


class BlogCategoryView(APIView):
    serializer_class = BlogSerializer
    permission_classes = (permissions.AllowAny, )
    http_method_names = ['get', 'head']

    def post(self, request, format=None):
        self.http_method_names.append("GET")
        data = self.request.data
        category = data['id']
        queryset = Post.objects.order_by(
            '-date_created').filter(category__iexact=category)

        serializer = BlogSerializer(queryset, many=True)

        return Response(serializer.data)
