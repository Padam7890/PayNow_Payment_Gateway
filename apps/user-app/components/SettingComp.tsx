import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shadeUI/components/ui/card";
import { Separator } from "../shadeUI/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../shadeUI/components/ui/avatar";
import { Button } from "../shadeUI/components/ui/button";
import { toTitleCase } from "../utils/function";
import nextAuth, { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import { Input } from "../shadeUI/components/ui/input";
import { Label } from "../shadeUI/components/ui/label";

const SettingComp = async () => {
  const data = await getServerSession(authOptions);
  const userName = data?.user.name;
  const userEmail = data?.user.email;
  const userPhone = data?.user.number;
  console.log(data.user);

  return (
    <div className=" container mx-auto py-10">
      <Card className=" max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Update your profile and account settings to enhance your experience.
          </CardDescription>
        </CardHeader>
        <CardContent className=" space-y-6">
          <div className="space-y-4">
            <h3 className=" text-lg font-medium">Profile</h3>
            <Separator />
            <div className=" flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/146855181?v=4" />
                <AvatarFallback>Padam</AvatarFallback>
              </Avatar>
              <div>
                <h4 className=" text-sm font-medium">
                  {toTitleCase(userName || "Stranger")}
                </h4>
                <p className=" text-sm text-muted-foreground">
                  Change your profile picture.
                </p>
                <Button variant="outline" size={"sm"} className="mt-2">
                  Change
                </Button>
              </div>
            </div>
            <div className=" space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" placeholder="Your Name" value={userName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Phone</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={userPhone}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingComp;
