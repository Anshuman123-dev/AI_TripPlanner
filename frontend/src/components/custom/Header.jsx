







import React, { useState } from "react";
import { Button } from "../ui/button";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { 
  User, 
  LogOut, 
  Briefcase, 
  ChevronDown 
} from "lucide-react";

// Updated import to use direct imports from our custom component
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/custom/dropdown-menu";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Toast function since we might not have a toast component
  const showToast = (message, type = "info") => {
    // Simple implementation - you can replace with your own toast library
    console.log(`[${type}] ${message}`);
    // Add toast implementation if you have one
  };

  const login = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (error) => {
      console.log(error);
      showToast("There was a problem signing in with Google.", "error");
    },
  });

  const GetUserProfile = (tokenInfo) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        const userData = {
          googleId: res.data.id,
          name: res.data.name,
          email: res.data.email,
          picture: res.data.picture,
        };
        axios
          .post(`${API_URL}/api/users`, userData)
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            setOpenDialog(false);
            showToast(`Successfully signed in as ${response.data.name}`);
            window.location.reload();
          })
          .catch((err) => {
            console.error("Error saving user to backend:", err);
            showToast("Failed to save user data", "error");
          });
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        showToast("Failed to fetch user profile", "error");
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    showToast("You've been successfully signed out");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b  px-5 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-15 w-auto" />
          
        </a>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <a href="/my-trips">
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
                  <Briefcase size={18} />
                  <span>My Trips</span>
                </Button>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Briefcase size={20} />
                </Button>
              </a>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-full p-1 pl-1 pr-2">
                    <img
                      src={user?.picture}
                      className="h-8 w-8 rounded-full border-2 border-primary/10"
                      alt={user?.name || "Profile"}
                    />
                    <span className="hidden md:inline-block max-w-32 truncate">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
                    {user?.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/profile" className="cursor-pointer flex items-center gap-2">
                      <User size={16} />
                      <span>Profile</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/my-trips" className="cursor-pointer flex items-center gap-2 md:hidden">
                      <Briefcase size={16} />
                      <span>My Trips</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 flex items-center gap-2">
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button 
              onClick={() => setOpenDialog(true)} 
              className="flex items-center gap-2"
              size="sm"
            >
              <User size={16} />
              <span>Sign In</span>
            </Button>
          )}
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">Welcome to TripPlanner</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center py-4">
                <img src="/logo.svg" alt="Logo" className="w-16 h-16 mb-4" />
                <p className="text-center text-gray-500 mb-6">
                  Sign in to access your trips and create new travel plans
                </p>
                <Button
                  onClick={login}
                  className="w-full py-6 flex gap-4 items-center justify-center"
                  size="lg"
                >
                  <FcGoogle className="text-xl" /> 
                  <span>Continue with Google</span>
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;