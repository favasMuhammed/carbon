"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";

interface CarbonPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: "ads" | "designs";
}

export function CarbonPopup({ isOpen, onClose, type }: CarbonPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Define the form schema based on the popup type
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    companyName: z.string().min(2, { message: "Company name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
    ...(type === "ads"
      ? {
          adInterest: z.enum(["Metro", "Mall", "Both"], {
            required_error: "Please select your ad interest",
          }),
          message: z.string().optional(),
        }
      : {
          message: z.string().optional(),
        }),
  });

  // Create the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Update the onSubmit function to use the specific PDF links
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Add timestamp to the form data
    const formData = {
      ...values,
      created_at: new Date().toISOString(),
    };

    // Determine which sheet to use based on the popup type
    const sheetName = type === "ads" ? "carbon-ads" : "carbon-designs";
    const apiUrl = `https://sheetdb.io/api/v1/47f046qdlv850?sheet=${sheetName}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([formData]),
      });

      const data = await response.json();

      if (data.created === 1) {
        setIsSuccess(true);

        // Get the correct PDF URL based on type
        const pdfUrl =
          type === "ads"
            ? "https://drive.google.com/uc?export=download&id=1lG1p7dphPyJaQKit8XKOsnYzguoiNJX6"
            : "https://drive.google.com/uc?export=download&id=1BDJTKgQ70EKgRW-D4b-44iWnNzD4EuWG";

        // Create a download link and trigger it
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.setAttribute(
          "download",
          type === "ads"
            ? "carbon-ads-media-kit.pdf"
            : "carbon-designs-catalogue.pdf"
        );
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset the form state when the modal is closed
  const handleClose = () => {
    form.reset();
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 rounded-xl border-none">
        <DialogHeader className="p-6 text-foreground">
          <DialogTitle className="text-2xl text-center font-bold">
            {type === "ads"
              ? "Partner with Carbon Ads"
              : "Get Our Carbon Designs Catalogue"}
          </DialogTitle>
          <p className="text-muted-foreground text-center text-base mt-1">
            {type === "ads"
              ? "Advertise in premium metro & mall locations in Kerala and Bangalore"
              : "Get our exclusive catalogue with sustainable design solutions"}
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
            <div className="rounded-full bg-primary/10 p-4 mb-5">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">
              Thank You!
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {type === "ads"
                ? "Your request has been received. The media kit is downloading now."
                : "Your catalogue is downloading now. We've also sent a copy to your email."}
            </p>
            <Button onClick={handleClose} className="px-8 bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA]  text-white px-8 py-3 rounded-lg transition-colors">
              Close
            </Button>
          </div>
        ) : (
          <div className="px-6 pb-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your phone number"
                          {...field}
                          type="tel"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {type === "ads" && (
                  <FormField
                    control={form.control}
                    name="adInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ad Interest <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                        //   defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your ad interest" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Metro">Metro</SelectItem>
                            <SelectItem value="Mall">Mall</SelectItem>
                            <SelectItem value="Both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Message {type === "designs" && "(Optional)"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            type === "ads"
                              ? "Tell us about your brand..."
                              : "Any specific requirements..."
                          }
                          className="resize-none h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-5 bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA]  text-white px-8 py-3 rounded-lg transition-colors font-medium mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Submit & Download"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
