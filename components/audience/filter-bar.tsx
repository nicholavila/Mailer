import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  filterAttributes,
  isTypeOfDate,
  isTypeOfString,
  isTypeOfSubscribed,
  isTypeOfTags
} from "@/lib/filter-customer";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaClosedCaptioning } from "react-icons/fa";
import { FilterType } from "@/shared/filter-type";
import {
  DateCondition,
  StringCondition,
  SubscribedCondition,
  TagsCondition
} from "./condition-tags";

type PropsType = {
  filter: FilterType;
  onAttributeChange: (value: string) => void;
  onFilterDelete: () => void;
};

export const FilterBar = ({
  filter,
  onAttributeChange,
  onFilterDelete
}: PropsType) => {
  return (
    <main className="w-full flex items-center justify-between px-6 py-4 border rounded-none">
      <div className="flex items-center gap-x-6">
        <Select onValueChange={onAttributeChange}>
          <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
            <SelectValue placeholder="Select or search a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Select a Key</SelectLabel> */}
              {filterAttributes.map((attribute, index) => (
                <SelectItem key={attribute.value} value={attribute.value}>
                  {attribute.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isTypeOfSubscribed(filter.attribute) ? (
          <SubscribedCondition />
        ) : isTypeOfDate(filter.attribute) ? (
          <DateCondition />
        ) : isTypeOfTags(filter.attribute) ? (
          <TagsCondition />
        ) : isTypeOfString(filter.attribute) ? (
          <StringCondition />
        ) : null}
      </div>
      <Button variant="ghost">
        <p className="text-red-700 font-semibold" onClick={onFilterDelete}>
          Delete
        </p>
      </Button>
    </main>
  );
};
