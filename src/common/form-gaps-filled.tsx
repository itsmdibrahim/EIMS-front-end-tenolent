import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IoMdAddCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { InputArrayItem } from "@/interfaces";

interface IfStatesAreEmptyInterface {
  objKey: string;
  value: string;
}

function FormGapsFilled({
  inputArray,
  getInputData,
}: {
  inputArray?: InputArrayItem[] | undefined;
  getInputData?: (data: object) => void;
}) {
  const [inputObj, setInputObj] = useState<any>({});
  const [cantSave, setCantSave] = useState<boolean>(true);
  const [getInputDataFnTriggered, setGetInputDataFnTriggered] =
    useState<number>(0);

  function handleClose() {
    let newObj: any = {};

    for (const k in inputObj) {
      if (Object.prototype.hasOwnProperty.call(inputObj, k)) {
        newObj[k] = "";
      }
    }

    setInputObj(newObj);
    setCantSave(true);
  }

  function ifStatesAreEmpty({ objKey, value }: IfStatesAreEmptyInterface) {
    let foundEmptyString: boolean = false;
    for (const k in inputObj) {
      if (Object.prototype.hasOwnProperty.call(inputObj, k)) {
        const el = inputObj[k];

        if (k != objKey && el == "") {
          foundEmptyString = true;
          break;
        }
      }
    }

    if (foundEmptyString && value == "") {
      setCantSave(true);
    } else if (foundEmptyString && value != "") {
      setCantSave(true);
    } else if (value == "") {
      setCantSave(true);
    } else {
      setCantSave(false);
    }
  }

  useEffect(() => {
    if (inputArray) {
      let inputKeys: string[] = inputArray.map((input) => input.objKey);
      let newObj: any = {};

      for (let i = 0; i < inputKeys.length; i++) {
        const k = inputKeys[i];
        newObj[k] = "";
      }
      setInputObj(newObj);
      setGetInputDataFnTriggered(0);
    }
  }, [getInputDataFnTriggered]);

  return (
    <div>
      <Drawer onClose={handleClose}>
        <DrawerTrigger className="fixed lg:bottom-8 bottom-1 lg:right-8 right-1">
          <IoMdAddCircle className="text-4xl text-primary" />
        </DrawerTrigger>
        <DrawerContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getInputData && getInputData(inputObj);
              setGetInputDataFnTriggered(1);
            }}
            className="h-[65vh] overflow-x-hidden flex flex-col items-center pb-10"
          >
            <div className="min-w-[260px] flex justify-end mt-4">
              <Button disabled={cantSave}>Add</Button>
            </div>

            <DrawerHeader>
              <DrawerTitle className="capitalize text-center">
                add data
              </DrawerTitle>
              <DrawerDescription className="text-center">
                Fill the inputs and hit add.
              </DrawerDescription>
            </DrawerHeader>

            <div className="min-w-[260px] pt-5 grid gap-4">
              {inputObj && inputArray ? (
                inputArray.map((input, i) => (
                  <div key={i} className="flex flex-col space-y-1.5 w-full">
                    <MakeAnInput
                      ifStatesAreEmpty={ifStatesAreEmpty}
                      inputObj={inputObj}
                      setInputObj={setInputObj}
                      inputItems={input}
                    />
                  </div>
                ))
              ) : (
                <div className="text-light-black">No inputs to fill!</div>
              )}
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function MakeAnInput(props: any) {
  let { ifStatesAreEmpty, inputObj, setInputObj, inputItems } = props;
  let {
    shadcnComponent: Component,
    type,
    htmlFor,
    labelTx,
    placeholder,
    classNames,
    objKey,
  } = inputItems;

  return (
    <div>
      <Label htmlFor={htmlFor}>{labelTx}</Label>
      <Component
        {...(type ? { type } : {})}
        id={htmlFor}
        placeholder={placeholder}
        className={cn("w-full", classNames)}
        onChange={(e: any) => {
          let value = type == "file" ? e.target.files : e.target.value;

          ifStatesAreEmpty({ objKey, value });
          setInputObj((prev: any) => ({ ...prev, [objKey]: value }));
        }}
        {...(type != "file"
          ? { value: inputObj[objKey] ? inputObj[objKey] : `` }
          : {})}
      />
    </div>
  );
}

export default FormGapsFilled;
