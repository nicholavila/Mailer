import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CampaignFromSchema } from "@/schemas/campaign";
import { Campaign } from "@/shared/campaign-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaCheck, FaSave } from "react-icons/fa";
import { FcCancel, FcCloseUpMode, FcCollapse } from "react-icons/fc";
import { z } from "zod";

type Props = {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
};

export const AccordianItemFrom = ({ campaign, setCampaign }: Props) => {
  const isChanged = () => {
    return (
      campaign?.from?.name !== fromForm.getValues("name") ||
      campaign?.from?.email !== fromForm.getValues("email")
    );
  };

  const fromForm = useForm<z.infer<typeof CampaignFromSchema>>({
    resolver: zodResolver(CampaignFromSchema),
    defaultValues: {
      name: campaign?.from?.name,
      email: campaign?.from?.email
    }
  });

  const onFromSubmit = (values: z.infer<typeof CampaignFromSchema>) => {
    if (campaign) {
      setCampaign(
        (prev) =>
          ({
            ...prev,
            from: values
          }) as Campaign
      );
    }
  };

  const onCancel = () => {
    if (campaign.from) {
      fromForm.setValue("name", campaign.from.name as string);
      fromForm.setValue("email", campaign.from.email as string);
    } else {
      fromForm.setValue("name", "");
      fromForm.setValue("email", "");
    }
  };

  return (
    <AccordionItem value="step-1-from">
      <AccordionTrigger className="hover:no-underline hover:drop-shadow">
        <div className="flex items-start gap-x-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full 
          ${campaign?.from ? "bg-green-600" : "bg-gray-600"}
        `}
          >
            <FaCheck className="text-white" />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-xl">From</p>
            <p className="text-sm text-gray-500">Who is sending this email?</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-1 pt-1">
        <Form {...fromForm}>
          <form
            onSubmit={fromForm.handleSubmit(onFromSubmit)}
            className="w-full flex flex-col gap-y-4"
          >
            <div className="w-full flex items-start gap-x-6">
              <div className="w-1/2 flex">
                <FormField
                  control={fromForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2 flex">
                <FormField
                  control={fromForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-x-4">
              <Button
                disabled={!isChanged()}
                type="submit"
                variant="outline"
                className="w-48 flex items-center gap-x-2 border-green-700"
              >
                <FaSave className="text-green-700" />
                Save
              </Button>
              <Button
                disabled={!isChanged()}
                type="button"
                variant="outline"
                className="w-48 flex items-center gap-x-2 border-red-700"
                onClick={onCancel}
              >
                <FcCancel />
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};
