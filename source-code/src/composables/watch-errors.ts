import { toast } from "@/components/ui/toast";
import { StoreGeneric } from "pinia";

export function WatchErrors(store: StoreGeneric) {
  store.$subscribe((_, state) => {
    const { error } = state;
    if (error !== undefined && typeof error === "string") {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
        variant: "destructive",
      });
    }
  });
}
