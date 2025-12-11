// sellerRoutes.js
import express from 'express'
import {
  getActiveSellerPlans,
  createSellerApplication,
  listPendingApplications,
  approveSellerApplication,
  getSellerByUserId,
  getActiveSellerMembership,
  createOrChangeSellerMembership
} from './sellerService.js'

const router = express.Router()

// Basit auth simulation: header'dan user_id al
function getUserIdFromRequest(req) {
  const userId = req.header('x-user-id')
  return userId || null
}

/**
 * GET /api/seller/plans
 * Aktif seller membership paketlerini döner.
 */
router.get('/plans', async (req, res) => {
  try {
    const plans = await getActiveSellerPlans()
    res.json({ success: true, data: plans })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

/**
 * POST /api/seller/apply
 * Body: { company_name, contact_name, email, phone?, country?, city?, main_products }
 */
router.post('/apply', async (req, res) => {
  try {
    const {
      company_name,
      contact_name,
      email,
      phone,
      country,
      city,
      main_products
    } = req.body

    if (!company_name || !contact_name || !email || !main_products) {
      return res.status(400).json({
        success: false,
        message: 'Zorunlu alanlar eksik. (company_name, contact_name, email, main_products)'
      })
    }

    const application = await createSellerApplication({
      company_name,
      contact_name,
      email,
      phone,
      country,
      city,
      main_products
    })

    res.json({ success: true, data: application })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

/**
 * GET /api/seller/me
 * Header: x-user-id: <uuid>
 * Seller + aktif membership bilgisi döner.
 */
router.get('/me', async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req)
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'user_id bulunamadı.' })
    }

    const seller = await getSellerByUserId(userId)
    if (!seller) {
      return res.json({
        success: true,
        data: null,
        message: 'Bu kullanıcıya bağlı seller kaydı bulunamadı.'
      })
    }

    const membership = await getActiveSellerMembership(seller.id)

    res.json({
      success: true,
      data: {
        seller,
        membership
      }
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

/**
 * POST /api/seller/select-plan
 * Body: { planCode }
 * Header: x-user-id: <uuid>
 */
router.post('/select-plan', async (req, res) => {
  try {
    const userId = getUserIdFromRequest(req)
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'user_id bulunamadı.' })
    }

    const { planCode } = req.body
    if (!planCode) {
      return res
        .status(400)
        .json({ success: false, message: 'planCode alanı zorunlu.' })
    }

    const seller = await getSellerByUserId(userId)
    if (!seller) {
      return res
        .status(400)
        .json({ success: false, message: 'Önce seller kaydı oluşturulmalı.' })
    }

    const result = await createOrChangeSellerMembership({
      sellerId: seller.id,
      planCode
    })

    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

/**
 * ADMIN ROUTES
 * Bunları basit tuttum, gerçek hayatta auth kontrolü eklemen lazım.
 */

// GET /api/seller/admin/applications
router.get('/admin/applications', async (req, res) => {
  try {
    const apps = await listPendingApplications()
    res.json({ success: true, data: apps })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/seller/admin/applications/:id/approve
// Body: { userId }
router.post('/admin/applications/:id/approve', async (req, res) => {
  try {
    const applicationId = req.params.id
    const { userId } = req.body

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'userId zorunlu.' })
    }

    const result = await approveSellerApplication({ applicationId, userId })

    res.json({ success: true, data: result })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router
