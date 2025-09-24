import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Target } from "lucide-react";

const MissionVisionManagement = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Mission & Vision Management
                </CardTitle>
                <CardDescription>
                    Configure the school's mission, vision, and core values
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 text-gray-500">
                    <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Mission & Vision management coming soon...</p>
                    <p className="text-sm mt-2">
                        This section will allow you to edit the school's
                        mission, vision, and core values.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default MissionVisionManagement;
