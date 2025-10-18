# TODO: Implement Authentication Checks for Homepage Buttons

## Tasks
- [x] Update Homepage.tsx: Import useAuthStore and modify onClick handlers for "troubles", "professionnels", "temoignages", and "urgence" buttons to check authentication. If not authenticated, navigate to '/login' with state { from: targetPath }, else navigate to targetPath.
- [x] Update Login.tsx: After successful login, check location.state?.from and navigate to that path, defaulting to '/home'.
- [x] Test the flow: Click a button while unauthenticated -> redirected to login -> after login, redirected to the intended page.
- [x] Create ProtectedRoute component to wrap protected routes.
- [x] Update App.tsx to wrap protected routes with ProtectedRoute.
- [x] Simplify Homepage.tsx handlers since protection is now at route level.
- [x] Fix dynamic routes: Protect /troubles/:id and /histoires/:id routes.

## Additional Tasks: Update Testimonial Management
- [x] Update useCreateTemoignage hook: Change statut from 'en_attente' to 'en attente', add createdAt and updatedAt fields.
- [x] Add useUpdateTemoignageStatus hook for updating testimonial status via PATCH.
- [x] Update Admin.tsx: Change testimonial status update method from PUT to PATCH.
- [x] Update Admin.tsx: Add status display line in testimonials section for better visibility.
