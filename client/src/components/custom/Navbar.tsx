import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "@/App";
import axios from "axios";

const Navbar = () => {
  const { isLogged, setIsLogged, user, setUser } = useContext(appContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [adminButtonChecked, setAdminButtonChecked] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    adminPass: "",
  });
  const [secret_pass, setSecretPass] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.id]: event.target.value,
    });
  };

  const handleRegistInputChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSecretPassChange = (event) => {
    setSecretPass(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAdminButtonChange = () => {
    setAdminButtonChecked(!adminButtonChecked);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const data = loginData;
    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLogged(true);
        const { admin, fullName, email, member } = data;
        setUser({ fullName, email, member, admin });
        setLoginData({ email: "", password: "" });
        setAdminButtonChecked(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const data = registerData;
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setRegisterData({
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          adminPass: "",
        });
        setAdminButtonChecked(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSecretPassSubmit = (e) => {
    e.preventDefault();
    const data = { secret_pass };
    fetch("http://localhost:3000/member", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ ...user, member: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogoutSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setIsLogged(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/newpost",
        { message },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <nav className="flex items-center justify-between bg-slate-950 py-3 ">
      <div className="pl-5">
        <h1 className="text-white font-bold text-lg">
          Members<span className="text-sky-400">Only</span>
        </h1>
      </div>
      <div className="pr-2 flex gap-3">
        {!isLogged && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Login</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={loginData.email}
                      className="col-span-3"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      value={loginData.password}
                      className="col-span-3"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleLoginSubmit}>
                    Login
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Register</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Register</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      value={registerData.first_name}
                      className="col-span-3"
                      onChange={handleRegistInputChange}
                      name="first_name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="last_name" className="text-right">
                      Last name
                    </Label>
                    <Input
                      id="last_name"
                      value={registerData.last_name}
                      className="col-span-3"
                      onChange={handleRegistInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={registerData.email}
                      className="col-span-3"
                      onChange={handleRegistInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      value={registerData.password}
                      className="col-span-3"
                      onChange={handleRegistInputChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="admin" onClick={handleAdminButtonChange} />
                    <label
                      htmlFor="admin"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Register as an admin
                    </label>
                    {adminButtonChecked && (
                      <Input
                        id="adminPass"
                        className="col-span-3"
                        onChange={handleRegistInputChange}
                        value={registerData.adminPass}
                      />
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleRegisterSubmit}>
                    Register
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        {isLogged && !user.admin && !user.member && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">join Club</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Join Club</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="secret_pass" className="text-right">
                      Secret Pass
                    </Label>
                    <Input
                      id="secret_pass"
                      value={secret_pass}
                      className="col-span-3"
                      onChange={handleSecretPassChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSecretPassSubmit}>
                    Login
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        {isLogged && (user.admin || user.member) && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">New Message</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>New Message</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="message" className="text-right">
                      Message
                    </Label>
                    <Input
                      id="message"
                      value={message}
                      className="col-span-3"
                      onChange={handleMessageChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleMessageSubmit}>
                    Send
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        {isLogged && (
          <>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Acount</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>{`full Name: ${user.fullName}`}</MenubarItem>
                  <MenubarItem>{`Email: ${user.email}`} </MenubarItem>
                  <MenubarItem>
                    {`Member: ${user.member.toString()}`}{" "}
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={handleLogoutSubmit}>Logout</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
