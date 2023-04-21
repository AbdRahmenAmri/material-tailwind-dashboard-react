import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  Progress,
  Input,
  Button,
  Switch,
  Select,
  Option,
  Radio,
  Textarea,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { projectsTableData } from "@/data";
import { ProfileInfoCard } from "@/widgets/cards";
import { useLayoutEffect, useState } from "react";
import { createPlan, getAllPlan, updatePlan } from "../../services/plans";
import { hasAdmin } from "@/services/Auth";

export function Plans() {
  const handleCreate = (e) => {
    let form = {};
    form.name = e.target.form.name.value;
    form.description = e.target.form.description.value;
    form.duration = parseInt(e.target.form.duration.value);
    form.price = parseFloat(e.target.form.price.value);
    form.status = e.target.form.status.value;
    createPlan(form)
      .then((res) => {
        document.querySelector(`#${e.target.parentElement.id} span`).innerText =
          res.success;
      })
      .catch((err) => {
        document.querySelector(`#${e.target.parentElement.id} span`).innerText =
          err.error;
      });
  };
  const handleUpdate = (e) => {
    let form = {};
    form.id = e.target.form.id.value;
    form.name = e.target.form.name.value;
    form.description = e.target.form.description.value;
    form.duration = parseInt(e.target.form.duration.value);
    form.price = parseFloat(e.target.form.price.value);
    form.status = e.target.form.status.value;
    updatePlan(form)
      .then((res) => {
        document.querySelector(`#${e.target.parentElement.id} span`).innerText =
          res.success;
      })
      .catch((err) => {
        document.querySelector(`#${e.target.parentElement.id} span`).innerText =
          err.error;
      });
  };

  const [isadmin, setIsadmin] = useState(false);
  const [plans, setPlans] = useState([]);

  useLayoutEffect(() => {
    hasAdmin()
      .then((res) => {
        setIsadmin(res);
      })
      .then(() => {
        getAllPlan().then((data) => {
          console.log(data);
          setPlans(data);
        });
      });
  }, []);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            All Plans
          </Typography>
        </CardHeader>
        <div className="gird-cols-2 mb-12 grid gap-12 px-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <ProfileInfoCard
            title="Create New Plan"
            details={{
              /* id: <input type="hidden"/>, */
              form: (
                <form className="grid w-full gap-2 px-1" id="new-plan">
                  <Input label="Name" name="name" id="name" />
                  <Textarea type="text" label="Description" id="description" />
                  <Input type="number" label="Duration" id="duration" />
                  <Input label="Price" type="number" id="price" />
                  <Typography variant="h6">Plan Status</Typography>
                  <Radio name="status" label="Enable" value={true} />
                  <Radio
                    name="status"
                    label="Disable"
                    value={false}
                    defaultChecked
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
                key={plan.id}
                title={plan.name}
                details={{
                  /* id: <input type="hidden"/>, */
                  form: (
                    <form
                      className="grid w-full gap-2 px-1"
                      id={`update${plan.id}`}
                    >
                      <input
                        type="hidden"
                        name="id"
                        id="id"
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
                        name="status"
                        label="Enable"
                        value={true ? plan.isActive : false}
                      />
                      <Radio
                        name="status"
                        label="Disable"
                        value={true ? plan.isActive : false}
                        defaultChecked
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
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Projects Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "blue"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Plans;
