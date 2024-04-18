from django.urls import path, include
from . import views
from .views import PostListView, BlogCategoryView, BlogDetailView, BlogFeaturedView
from .feeds import LatestPostsFeed

app_name = 'blog'

urlpatterns = [
    path('', PostListView.as_view(), name='list_view'),
    path('category', BlogCategoryView.as_view(), name='category'),
    path('featured', BlogFeaturedView.as_view(), name='featured'),
    path('<slug>', BlogDetailView.as_view(), name='blog_details'),
    # path('<int:year>/<int:month>/<int:day>/<slug:slug>/', views.BlogDetailView.as_view(), name='post_detail'),
    # path('comments/', views.CommentView.as_view(), name='blog_comments'),
    # path('blog/', views.post_list, name='post_list'),
    # path('<int:year>/<int:month>/<int:day>/<slug:post>/',
    #      views.post_detail, name='post_detail'),
    # path('tag/<slug:tag_slug>/', views.post_list, name='post_list_by_tag'),
    path('feed/', LatestPostsFeed(), name='post_feed'),

]