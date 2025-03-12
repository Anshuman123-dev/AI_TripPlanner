// import React, { useEffect } from "react";
// import { Button } from "../ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { googleLogout } from "@react-oauth/google";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
// } from "@/components/ui/dialog";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { FcGoogle } from "react-icons/fc";

// const Header = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));
//   useEffect(() => {
//     console.log(user);
//   }, []);

//   const login = useGoogleLogin({
//     onSuccess: (response) => GetUserProfile(response),
//     onError: (error) => console.log(error),
//   });

//   const GetUserProfile = (tokenInfo) => {
//     axios
//       .get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenInfo?.access_token}`,
//             Accept: "Application/json",
//           },
//         }
//       )
//       .then((res) => {
//         const userData = {
//           googleId: res.data.id,
//           name: res.data.name,
//           email: res.data.email,
//           picture: res.data.picture,
//         };
//         axios
//           .post("http://localhost:5000/api/users", userData)
//           .then((response) => {
//             localStorage.setItem("user", JSON.stringify(response.data));
//             setOpenDialog(false);
//             window.location.reload();
//           })
//           .catch((err) => {
//             console.error("Error saving user to backend:", err);
//             toast("Failed to save user");
//           });
//       })
//       .catch((err) => {
//         console.error("Error fetching user profile:", err);
//         toast("Failed to fetch user profile");
//       });
//   };

//   return (
//     <div className="p-3 shadow-sm flex justify-between items-center px-5">
//       <img src="/logo.svg" />
//       <div>
//         {user ? (
//           <div className="flex items-center gap-3">
//             <a href="/my-trips">
//               <Button variant="outline" className="rounded-full">
//                 My Trips
//               </Button>
//             </a>
//             <Popover>
//               <PopoverTrigger>
//                 <img
//                   src={user?.picture}
//                   className="h-[35px] w-[35px] rounded-full"
//                 />
//               </PopoverTrigger>
//               <PopoverContent>
//                 <h2
//                   className="cursor-pointer"
//                   onClick={() => {
//                     googleLogout();
//                     localStorage.clear();
//                     window.location.reload();
//                   }}
//                 >
//                   Log Out
//                 </h2>
//               </PopoverContent>
//             </Popover>
//           </div>
//         ) : (
//           <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
//         )}
//       </div>
//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <img src="/logo.svg" alt="Logo" />
//               <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
//               <p>Sign in to the app with Google authentication securely</p>
//               <Button
//                 onClick={login}
//                 className="w-full mt-5 flex gap-4 items-center"
//               >
//                 <FcGoogle /> Sign In With Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Header;


import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
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
          .post("http://localhost:5000/api/users", userData)
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            setOpenDialog(false);
            window.location.reload();
          })
          .catch((err) => {
            console.error("Error saving user to backend:", err);
            toast("Failed to save user");
          });
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        toast("Failed to fetch user profile");
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
      <img src="/logo.svg" alt="Logo" className="cursor-pointer" />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>

            {/* Custom Popover Implementation */}
            <div className="relative" ref={popoverRef}>
              <img
                src={user?.picture}
                className="h-[35px] w-[35px] rounded-full cursor-pointer"
                alt="Profile"
                onClick={() => setShowPopover(!showPopover)}
              />
              
              {showPopover && (
                <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg p-4 w-40 z-50">
                  <button
                    className="w-full text-left hover:bg-gray-100 p-2 rounded-md transition-colors"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center">
                <img src="/logo.svg" alt="Logo" className="w-24 h-24" />
                <h2 className="font-bold text-lg mt-4 text-foreground">
                  Sign in with Google
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Sign in to the app with Google authentication securely
                </p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="text-lg" /> 
                  <span>Continue with Google</span>
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;