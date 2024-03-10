import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [secret_pass, setSecretPass] = useState("");

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
      .then((data) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSecretPassSubmit = (e) => {
    console.log("submitting");
    e.preventDefault();
    const data = { secret_pass };
    console.log(data);
    fetch("http://localhost:3000/member", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogoutSubmit = (e) => {
    console.log("Logging out...");
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
        console.log("success logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav>
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
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleRegisterSubmit}>
              Register
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Logout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={handleLogoutSubmit}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
