from django.shortcuts import render


# Create your views here

def admin_index(request):
    context = {}
    return render(request, 'admin/admin.html', context)
