# 🚀 Manual Startup Guide - Phase 3

## ✅ What's Already Done:
- ✅ Backend .env configured with your Supabase credentials
- ✅ Frontend .env configured with your Supabase credentials  
- ✅ JWT Secret generated: `5581515d6a62fa958252ebe4f9aa0ea37080cbc7cbfe24bb07c4eba725d54165`
- ✅ Backend dependencies installed

---

## 📝 Quick Manual Steps (5 minutes)

### Step 1: Open 2 PowerShell Terminals

#### Terminal 1 - Backend:
```powershell
cd g:\DigitalRecipeBook_Food\backend
npm start
```

**Expected Output:**
```
Server running on port 5000
```

**Leave this terminal running!**

---

#### Terminal 2 - Frontend:
```powershell
cd g:\DigitalRecipeBook_Food\frontend
npm install
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Leave this terminal running!**

---

### Step 2: Open Your Browser

Navigate to: **http://localhost:5173**

You should see your Digital Recipe Book homepage!

---

## 🧪 Test the Application

### Test 1: Register Account
1. Click "Sign Up" or "Register"
2. Enter:
   - Email: test@example.com
   - Password: TestPass123
   - First Name: Test
   - Last Name: User
3. Click "Register"
4. Should redirect to dashboard

### Test 2: Verify in Database
1. Go to Supabase dashboard
2. Click "Table Editor" → "users"
3. You should see your test account!

### Test 3: Login
1. Logout
2. Click "Login"
3. Enter: test@example.com / TestPass123
4. Should login successfully

---

## 🆘 Troubleshooting

### Backend won't start:
```powershell
# Check if port 5000 is free
netstat -ano | findstr :5000

# If occupied, kill the process or change PORT in backend/.env
```

### Frontend won't start:
```powershell
# Delete node_modules and reinstall
cd g:\DigitalRecipeBook_Food\frontend
Remove-Item -Recurse node_modules
npm install
npm run dev
```

### "Cannot connect to database":
- Check backend/.env has correct Supabase credentials
- Check Supabase project is running
- Check internet connection

### Page shows blank:
- Check browser console (F12) for errors
- Verify frontend/.env has correct API_BASE_URL
- Make sure backend is running

---

## ✅ Success Checklist

```
✅ Backend running on port 5000
✅ Frontend running on port 5173
✅ Can access http://localhost:5173 in browser
✅ Can register new account
✅ Can see user in Supabase dashboard
✅ Can login with credentials
✅ Dashboard loads after login
```

---

## 📊 Current Status

| Component | Status | URL/Port |
|-----------|--------|----------|
| Supabase Database | ✅ Running | https://aycwweviwkjivearlwec.supabase.co |
| Backend API | ⏳ Start manually | http://localhost:5000 |
| Frontend App | ⏳ Start manually | http://localhost:5173 |

---

## 🎯 After It's Running

Once both servers are running and you can see the app:

1. **Test registration and login**
2. **Take a screenshot** and show me!
3. **Then we'll move to Phase 4: Deployment**

---

**Ready to start?** Open 2 PowerShells and run the commands above! 🚀

