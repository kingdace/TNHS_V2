import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { FileText } from "lucide-react";

const PrivacyPolicyManagement = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Privacy Policy Management
                </CardTitle>
                <CardDescription>Manage privacy policy content</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Privacy Policy management coming soon...</p>
                    <p className="text-sm mt-2">
                        This section will allow you to edit the school's privacy
                        policy.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default PrivacyPolicyManagement;
