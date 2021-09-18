import {dictionary} from "@specs";

class BaseAdapter {
    static adaptModelDates ({ updated_at, created_at }: { created_at: string, updated_at: string } | dictionary<any>) {
        return {
            createdAt: created_at,
            updatedAt: updated_at
        }
    }
}

export {
    BaseAdapter
}