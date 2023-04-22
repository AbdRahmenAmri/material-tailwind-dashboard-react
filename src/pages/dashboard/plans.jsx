import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Input,
  Button,
  Radio,
  Textarea,
} from "@material-tailwind/react";

import { ProfileInfoCard } from "@/widgets/cards";
import { useLayoutEffect, useState } from "react";
import { createPlan, getAllPlan, updatePlan } from "../../services/plans";
import { hasAdmin } from "@/services/Auth";
import Plan from "@/components/plans";

export function Plans() {
  const [isadmin, setIsadmin] = useState(false);
  const [isPlanUpdate, setIsPlanUpdate] = useState(false);
  const [plans, setPlans] = useState([]);
  const handleCreate = (e) => {
    let form = {};
    form.name = e.target.form.name.value;
    form.description = e.target.form.description.value;
    form.duration = parseInt(e.target.form.duration.value);
    form.price = parseFloat(e.target.form.price.value);
    form.status = e.target.form.status.value;
    createPlan(form)
      .then((res) => {
        document.querySelector(
          `#${e.target.parentElement.getAttribute("id")} span`
        ).innerText = res.success;
        setIsPlanUpdate(!isPlanUpdate);
      })
      .catch((err) => {
        document.querySelector(
          `#${e.target.parentElement.getAttribute("id")} span`
        ).innerText = err.error;
      });
  };
  const handleUpdate = (e) => {
    let form = {};
    form.id = e.target.form.planID.value;
    form.name = e.target.form.name.value;
    form.description = e.target.form.description.value;
    form.duration = parseInt(e.target.form.duration.value);
    form.price = parseFloat(e.target.form.price.value);
    form.status = e.target.form[`status${form.id}`].value;
    updatePlan(form)
      .then((res) => {
        document.querySelector(
          `#${e.target.parentElement.getAttribute("id")} span`
        ).innerText = res.success;
        setIsPlanUpdate(!isPlanUpdate);
      })
      .catch((err) => {
        document.querySelector(
          `#${e.target.parentElement.getAttribute("id")} span`
        ).innerText = err.error;
      });
  };

  useLayoutEffect(() => {
    hasAdmin()
      .then((res) => {
        setIsadmin(res);
      })
      .then(() => {
        getAllPlan().then((data) => {
          setPlans(data);
        });
      })
      .catch(() => {
        getActivePlan().then((data) => {
          setPlans(data);
        });
      });
  }, [isPlanUpdate]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {isadmin && (
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Plans Mangements
            </Typography>
          </CardHeader>
          <div className="gird-cols-2 mb-12 grid gap-12 px-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <ProfileInfoCard
              className="col-span-2"
              title="Create New Plan"
              details={{
                /* id: <input type="hidden"/>, */
                form: (
                  <form className="grid w-full gap-2 px-1" id="new-plan">
                    <Input label="Name" name="name" id="name" />
                    <Textarea
                      type="text"
                      label="Description"
                      id="description"
                    />
                    <Input type="number" label="Duration" id="duration" />
                    <Input label="Price" type="number" id="price" />
                    <Typography variant="h6">Plan Status</Typography>
                    <Radio
                      id="enable"
                      name="status"
                      label="Enable"
                      value={true}
                      defaultChecked={false}
                    />
                    <Radio
                      id="disable"
                      name="status"
                      label="Disable"
                      value={false}
                      defaultChecked={true}
                    />
                    <span
                      className="m-2 flex items-center justify-center text-gray-700"
                      id="response"
                      name="response"
                    ></span>
                    <Button
                      fullWidth
                      className="bg-green-800"
                      onClick={(e) => {
                        handleCreate(e);
                      }}
                    >
                      Create
                    </Button>
                  </form>
                ),
              }}
            />
            {isadmin &&
              plans.map((plan) => (
                <ProfileInfoCard
                className={"col-span-2 sm:col-span-1 lg:col-span-1"}
                  key={plan.id}
                  title="Edit Plan"
                  details={{
                    /* id: <input type="hidden"/>, */
                    form: (
                      <form
                        className="grid w-full gap-2 px-1"
                        id={`update${plan.id}`}
                      >
                        <input
                          type="hidden"
                          name="planID"
                          value={plan.id}
                          readOnly
                        />
                        <Input
                          label="Name"
                          name="name"
                          id="name"
                          defaultValue={plan.name}
                        />
                        <Textarea
                          type="text"
                          label="Description"
                          id="description"
                          defaultValue={plan.description}
                        />
                        <Input
                          type="number"
                          label="Duration"
                          id="duration"
                          defaultValue={plan.duration}
                        />
                        <Input
                          label="Price"
                          type="number"
                          id="price"
                          defaultValue={plan.price}
                        />
                        <Typography variant="h6">Plan Status</Typography>
                        <Radio
                          id={`enable${plan.id}`}
                          name={`status${plan.id}`}
                          label="Enable"
                          value={true}
                          defaultChecked={true ? plan.isActive : false}
                        />
                        <Radio
                          id={`disable${plan.id}`}
                          name={`status${plan.id}`}
                          label="Disable"
                          value={false}
                          defaultChecked={true ? !plan.isActive : false}
                        />
                        <span
                          className="m-2 flex items-center justify-center text-gray-700"
                          id="response"
                          name="response"
                        ></span>
                        <Button
                          fullWidth
                          className="bg-blue-800"
                          onClick={(e) => {
                            handleUpdate(e);
                          }}
                        >
                          Update
                        </Button>
                      </form>
                    ),
                  }}
                />
              ))}
          </div>
        </Card>
      )}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Plans
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          < Plan/>
        </CardBody>
      </Card>
    </div>
  );
}

export default Plans;
