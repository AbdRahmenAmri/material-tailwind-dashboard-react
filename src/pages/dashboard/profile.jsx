import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import useTitle from "@/hooks/title";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { generateApiKey, updateUser, userInfo } from "@/services/user";

export function Profile() {
  useTitle("Dashboard Profile");
  const [user, setUser] = useState(false);
  const [response, setResponse] = useState("");
  const [update, setUpdate] = useState(false);

  const [name, setName] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [apiKey, setApiKey] = useState(undefined);

  const handleUpdate = () => {
    let up_user = {};
    if (name) up_user.name = name;
    if (password) up_user.password = password;
    if (apiKey) up_user.apiKey = apiKey;
    if (Object.keys(up_user).length !== 0) {
      updateUser(up_user)
        .then((res) => {
          setUpdate(!update);
          setResponse(res.success);
        })
        .catch((err) => {
          setResponse(err.error);
        });
    }
  };

  const reGenerateApiKey = () => {
    generateApiKey().then((data) => {
      setUser((user) => ({
        ...user,
        apiKey: data.apiKey,
      }));
      setApiKey(data.apiKey);
    });
  };

  useLayoutEffect(() => {
    userInfo().then((user) => {
      setUser(user);
    });
  }, [update]);
  return (
    <>
      {user ? (
        <>
          <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
            <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
          </div>
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
            <CardBody className="p-4">
              <div className="mb-10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {user.name}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-1 xl:grid-cols-1">
                <ProfileInfoCard
                  title="Profile Information"
                  details={{
                    name: (
                      <Input
                        defaultValue={user.name}
                        label="Name"
                        onChange={(e) => {
                          if (e.target.value !== "") setName(e.target.value);
                          else setName(undefined);
                        }}
                      />
                    ),
                    email: (
                      <Input
                        type="email"
                        value={user.email}
                        label="Email"
                        readOnly
                      />
                    ),
                    password: (
                      <Input
                        type="password"
                        label="Password"
                        onChange={(e) => {
                          if (e.target.value !== "") setPassword(e.target.value);
                          else setPassword(undefined);
                        }}
                      />
                    ),
                    apiKey: (
                      <>
                        <Input label="API KEY" value={user.apiKey} readOnly />{" "}
                        <Button
                          onClick={reGenerateApiKey}
                          variant="gradient"
                          className="flex items-center gap-3"
                        >
                          Regenerate
                          <ArrowPathIcon strokeWidth={2} className="h-5 w-5" />
                        </Button>
                      </>
                    ),
                    info: (
                      <span className="m-2 flex items-center justify-center text-gray-700">
                        {response}
                      </span>
                    ),
                    update: (
                      <Button fullWidth onClick={handleUpdate}>
                        UPDATE
                      </Button>
                    ),
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Profile;
