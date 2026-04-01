"""
URL configuration for impakto_config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from core.api import router as core_router
from ledger.api import router as ledger_router
from core.api import AuthBearer
from scoring.api import router as scoring_router
from loans.api import router as loans_router

# Initialize the Ninja API
api = NinjaAPI(title="Impakto Trust Infrastructure API", version="1.0.0")

# Register the core endpoints (login, signup, etc.) under the /api/auth namespace
api.add_router("/auth/", core_router)

# Register the ledger endpoints under the /api/ledger namespace
api.add_router("/ledger", ledger_router, auth=AuthBearer())  # Protect ledger endpoints with custom authentication

# Register the scoring endpoints under the /api/scoring namespace
api.add_router("/scoring", scoring_router, auth=AuthBearer())  # Protect scoring endpoints with custom authentication

# Register the loans endpoints under the /api/loans namespace
api.add_router("/loans", loans_router, auth=AuthBearer())

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls),
]
