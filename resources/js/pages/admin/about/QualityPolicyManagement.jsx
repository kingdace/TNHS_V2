import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Award } from "lucide-react";

const QualityPolicyManagement = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Quality Policy Management
                </CardTitle>
                <CardDescription>
                    Configure quality policy and standards
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 text-gray-500">
                    <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Quality Policy management coming soon...</p>
                    <p className="text-sm mt-2">
                        This section will allow you to edit the school's quality
                        policy and standards.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default QualityPolicyManagement;
