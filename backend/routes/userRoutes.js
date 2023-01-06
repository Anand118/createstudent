const express = require('express');
const { registerUser, loginUser, logout, getUserDetails, updatePassword, updateProfile, getAllStudent, getSingleStudent, deleteStudent, updateUserRole } = require('../controller/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();


router.route('/signup').post(registerUser)
router.route("/login").post(loginUser);
router.route('/logout').get(logout)

router.route('/our').get(isAuthenticatedUser, getUserDetails)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/our/updateProfile').put(isAuthenticatedUser, updateProfile)


router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles('admin'), getAllStudent)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles('admin'), getSingleStudent)
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeRoles('admin'), updateUserRole)
router.route("/admin/user/:id").delete(isAuthenticatedUser,authorizeRoles('admin'), deleteStudent)

module.exports = router