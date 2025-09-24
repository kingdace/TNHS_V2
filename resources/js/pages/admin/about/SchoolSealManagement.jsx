import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Shield } from "lucide-react";

const SchoolSealManagement = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    School Seal Management
                </CardTitle>
                <CardDescription>
                    Upload and manage school seal and logo
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 text-gray-500">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>School Seal management coming soon...</p>
                    <p className="text-sm mt-2">
                        This section will allow you to upload and manage the
                        school's seal and logo.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default SchoolSealManagement;
