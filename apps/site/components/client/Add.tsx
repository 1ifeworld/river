import { Button, Typography } from "@/design-system";

export function Add() {
    return (
        <Button variant="outline" className="w-[100px] h-[30px] rounded-[22px] border-muted-foreground">
            <Typography className="text-primary-foreground">
                +Add
            </Typography>
        </Button>
    )
}