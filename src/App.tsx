import { Children, useState } from "react";

const CustomSwitch = ({
  children,
  value,
}: {
  children: JSX.Element[];
  value: string | ((e: string) => boolean);
}) => {
  const cases: JSX.Element[] = [];
  const defaultCase: JSX.Element[] = [];
  Children.forEach(children, (e: JSX.Element) => {
    if (e?.type?.name === "CustomCase") {
      if (typeof e.props.value === "function") {
        if (e.props.value(value)) {
          cases.push(e);
        }
      } else if (value === e.props.value) {
        cases.push(e);
      }
    } else if (e?.type?.name === "DefaultCase") {
      defaultCase.push(e);
    }
  });
  if (cases.length > 0) return cases;
  else return defaultCase;
};
const CustomCase = ({
  children,
}: {
  children: JSX.Element;
  value: string | ((e: number) => boolean);
}) => {
  return <>{children}</>;
};
const DefaultCase = ({ children }: { children: JSX.Element }) => {
  return <>{children}</>;
};

const Display = ({ value, switchValue }: { value: string; switchValue: string }) => {
  return (
    <div className="mt-4 rounded-xl hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{value} Component</h1>
          <h4 className="py-2 text-xl font-semibold opacity-80">case value is {switchValue}</h4>
          <p className="py-3">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [switchValue, setSwitchValue] = useState("20");
  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full py-2">
        <label htmlFor="switchValue" className="text-lg font-semibold ">
          Enter case value
        </label>
        <input
          type="text"
          name="switchValue"
          placeholder="Type here"
          className="w-full mt-2 input input-bordered input-info"
          value={switchValue}
          onChange={(e) => setSwitchValue(e.target.value)}
        />
      </div>
      <CustomSwitch value={switchValue}>
        <CustomCase value={(e: number) => e > 10}>
          <Display value="1st" switchValue={switchValue} />
        </CustomCase>
        <CustomCase value="20">
          <Display value="2nd" switchValue={switchValue} />
        </CustomCase>
        <CustomCase value="30">
          <Display value="3rd" switchValue={switchValue} />
        </CustomCase>
        <DefaultCase>
          <Display value="Default" switchValue={switchValue} />
        </DefaultCase>
      </CustomSwitch>
    </div>
  );
}

export default App;
