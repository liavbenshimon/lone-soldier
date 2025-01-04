//TODO: Add a error state for the queue
//TODO: Add a success state for the queue
//TODO: change the deny button to not delete the request
//TODO: Add select for status

import {  useState } from "react";
import { api } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

interface SignupRequest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  progress: "submitted" | "under review" | "waiting kyc" | "completed";
  createdAt: string;
  updatedAt: string;
  isKYC: boolean;
  media: string[];
  approved: "in queue" | "approved" | "deny";
  reason?: string;
}

const fetchSignupRequests = async () => {
  const response = await api.get("/signup-requests");
  return response.data;
};

const QueueSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-24 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-24 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-16 rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-9 w-[100px]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default function AdminQueue() {

  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<SignupRequest | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "updatedAt">("createdAt");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Query for fetching signup requests
  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["signupRequests"],
    queryFn: fetchSignupRequests,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchInterval: 1000 * 30, // Refetch every 30 seconds
  });

  // Mutation for accepting a request
  const acceptMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/signup-requests/${id}/status`, {
        progress: "completed",
        approved: "approved",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signupRequests"] });
      setSelectedRequest(null);
    },
  });

  // Mutation for denying a request
  const denyMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/signup-requests/${id}/status`, {
        approved: "deny",
        reason: window.prompt("Please provide a reason for denial:"),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signupRequests"] });
      setSelectedRequest(null);
    },
  });

  const handleAccept = (id: string) => {
    acceptMutation.mutate(id);
  };

  const handleDeny = (id: string) => {
    denyMutation.mutate(id);
  };

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "submitted":
        return "bg-blue-500";
      case "under review":
        return "bg-yellow-500";
      case "waiting kyc":
        return "bg-purple-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getApprovalColor = (approved: string) => {
    switch (approved) {
      case "approved":
        return "bg-green-500";
      case "deny":
        return "bg-red-500";
      case "in queue":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredAndSortedRequests = requests
    .filter(
      (request: SignupRequest) =>
        (request.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === "all" || request.progress === statusFilter)
    )
    .sort(
      (a: SignupRequest, b: SignupRequest) =>
        new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime()
    );

  if (isLoading) {
    return (
      <>
        <Navbar modes={"admin"} />
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold mb-6">Signup Requests Queue</h1>
          <div className="flex gap-4 mb-6">
            <Skeleton className="h-10 w-[320px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>KYC</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <QueueSkeleton />
            </TableBody>
          </Table>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar modes={"admin"} />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Signup Requests Queue</h1>
        {error instanceof Error && (
          <div className="text-red-500 mb-4">
            {error.message || "An error occurred"}
          </div>
        )}
        {(acceptMutation.error || denyMutation.error) && (
          <div className="text-red-500 mb-4">
            {(acceptMutation.error as Error)?.message ||
              (denyMutation.error as Error)?.message ||
              "An error occurred"}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={sortBy}
            onValueChange={(value: "createdAt" | "updatedAt") =>
              setSortBy(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Submitted Date</SelectItem>
              <SelectItem value="updatedAt">Last Updated</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under review">Under Review</SelectItem>
              <SelectItem value="waiting kyc">Waiting KYC</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead>KYC</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <QueueSkeleton />
            ) : (
              filteredAndSortedRequests.map((request: SignupRequest) => (
                <TableRow key={request._id}>
                  <TableCell>
                    {request.firstName} {request.lastName}
                  </TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>
                    <Badge className={getProgressColor(request.progress)}>
                      {request.progress}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getApprovalColor(request.approved)}>
                      {request.approved}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={request.isKYC ? "default" : "secondary"}>
                      {request.isKYC ? "Verified" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(request.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedRequest(request)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Dialog
          open={!!selectedRequest}
          onOpenChange={() => setSelectedRequest(null)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Signup Request Details</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Name</h3>
                  <p>
                    {selectedRequest.firstName} {selectedRequest.lastName}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>{selectedRequest.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>{selectedRequest.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Account Type</h3>
                  <p>{selectedRequest.type}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <Badge className={getProgressColor(selectedRequest.progress)}>
                    {selectedRequest.progress}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold">KYC Status</h3>
                  <Badge
                    variant={selectedRequest.isKYC ? "default" : "secondary"}
                  >
                    {selectedRequest.isKYC ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold">Submitted On</h3>
                  <p>
                    {new Date(selectedRequest.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Last Updated</h3>
                  <p>
                    {new Date(selectedRequest.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                {selectedRequest.media && selectedRequest.media.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Media</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedRequest.media.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Media ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">Approval Status</h3>
                  <Badge className={getApprovalColor(selectedRequest.approved)}>
                    {selectedRequest.approved}
                  </Badge>
                </div>
                {selectedRequest.approved === "deny" &&
                  selectedRequest.reason && (
                    <div>
                      <h3 className="font-semibold">Denial Reason</h3>
                      <p className="text-destructive">
                        {selectedRequest.reason}
                      </p>
                    </div>
                  )}
                <div className="flex gap-4 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => handleAccept(selectedRequest._id)}
                    disabled={acceptMutation.isPending}
                  >
                    {acceptMutation.isPending ? "Accepting..." : "Accept"}
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDeny(selectedRequest._id)}
                    disabled={denyMutation.isPending}
                  >
                    {denyMutation.isPending ? "Denying..." : "Deny"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
