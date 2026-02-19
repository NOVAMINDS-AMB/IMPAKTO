from ninja import NinjaAPI
from ledger.api import router as ledger_router
from scoring.api import router as scoring_router
from consent.api import router as consent_router
from core.api import router as core_router

api = NinjaAPI(title="Impakto Trust Engine")

api.add_router("/ledger", ledger_router)
api.add_router("/scoring", scoring_router)
api.add_router("/access", consent_router)
api.add_router("/mfi", core_router)