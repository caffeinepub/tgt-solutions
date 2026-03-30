import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  LogIn,
  LogOut,
  RefreshCw,
  ShieldAlert,
  Truck,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { QuoteRequest } from "../backend.d";
import { ServiceType } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const LOGO_SRC =
  "/assets/img_20260330_183417-019d3ed8-9e19-77ad-8c0d-d719facfc2c9.jpg";

function formatNanos(ns: bigint): string {
  const ms = Number(ns / BigInt(1_000_000));
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const SERVICE_LABELS: Record<ServiceType, string> = {
  [ServiceType.fullTruckLoad]: "FTL",
  [ServiceType.lTLTruckLoad]: "LTL",
  [ServiceType.customizedLogistic]: "Custom",
};

export default function AdminPage() {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  const fetchQuotes = useCallback(async () => {
    if (!actor || !identity) return;
    setLoading(true);
    setError(null);
    setAccessDenied(false);
    try {
      const result = await actor.getAllQuoteRequestsSorted();
      setQuotes(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.toLowerCase().includes("unauthorized") ||
        msg.toLowerCase().includes("access denied")
      ) {
        setAccessDenied(true);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, [actor, identity]);

  useEffect(() => {
    if (actor && !isFetching && identity) {
      fetchQuotes();
    }
  }, [actor, isFetching, identity, fetchQuotes]);

  const isLoggedIn = !!identity;

  return (
    <div className="min-h-screen bg-[#F3F6F9] font-sans">
      {/* Header */}
      <header className="bg-navy shadow-lg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-1">
            <img
              src={LOGO_SRC}
              alt="TGT Solutions"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-tight">
              TGT Solutions
            </div>
            <div className="text-gold text-xs font-semibold tracking-widest uppercase">
              Admin Dashboard
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <span className="text-white/60 text-sm hidden sm:block">
              {identity.getPrincipal().toString().slice(0, 14)}…
            </span>
          )}
          {isLoggedIn ? (
            <Button
              variant="outline"
              size="sm"
              onClick={clear}
              data-ocid="admin.logout.button"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              data-ocid="admin.login.button"
              className="bg-gold hover:bg-gold/90 text-white"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              Login
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              window.location.href = "/";
            }}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            ← Back to Site
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Not logged in */}
        {!isLoggedIn && (
          <div
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="admin.login.panel"
          >
            <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mb-6">
              <Truck className="w-10 h-10 text-gold" />
            </div>
            <h1 className="text-2xl font-bold text-navy mb-2">
              Admin Access Required
            </h1>
            <p className="text-gray-500 mb-8 max-w-sm">
              Log in with Internet Identity to view and manage quote requests
              submitted through the website.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              data-ocid="admin.login_center.button"
              className="bg-gold hover:bg-gold/90 text-white font-bold px-8 py-3 text-base"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Logging
                  in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" /> Login with Internet
                  Identity
                </>
              )}
            </Button>
          </div>
        )}

        {/* Access denied */}
        {isLoggedIn && accessDenied && (
          <div
            className="flex flex-col items-center justify-center py-32 text-center"
            data-ocid="admin.access_denied.panel"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <ShieldAlert className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-navy mb-2">Access Denied</h1>
            <p className="text-gray-500 mb-6 max-w-sm">
              Your account does not have admin privileges. Please contact the
              system administrator.
            </p>
            <Button
              variant="outline"
              onClick={clear}
              data-ocid="admin.access_denied.logout_button"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        )}

        {/* Loading */}
        {isLoggedIn && !accessDenied && (loading || isFetching) && (
          <div
            className="flex items-center justify-center py-32"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="w-10 h-10 text-gold animate-spin" />
          </div>
        )}

        {/* Error */}
        {isLoggedIn && !accessDenied && error && (
          <div
            className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
            data-ocid="admin.error_state"
          >
            <p className="text-red-600 font-medium">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchQuotes}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Quotes table */}
        {isLoggedIn && !accessDenied && !loading && !isFetching && !error && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-navy">Quote Requests</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {quotes.length} request{quotes.length !== 1 ? "s" : ""}{" "}
                  received
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchQuotes}
                data-ocid="admin.refresh.button"
                className="border-navy/20 text-navy hover:bg-navy/5"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {quotes.length === 0 ? (
              <div
                className="bg-white rounded-2xl shadow-sm border border-navy/8 flex flex-col items-center justify-center py-24 text-center"
                data-ocid="admin.quotes.empty_state"
              >
                <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-navy/30" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-1">
                  No quote requests yet
                </h3>
                <p className="text-gray-400 text-sm">
                  When customers submit a quote request, it will appear here.
                </p>
              </div>
            ) : (
              <div
                className="bg-white rounded-2xl shadow-sm border border-navy/8 overflow-hidden"
                data-ocid="admin.quotes.table"
              >
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-navy/3 border-navy/10">
                        <TableHead className="text-navy font-semibold w-10">
                          #
                        </TableHead>
                        <TableHead className="text-navy font-semibold">
                          Name
                        </TableHead>
                        <TableHead className="text-navy font-semibold">
                          Email
                        </TableHead>
                        <TableHead className="text-navy font-semibold">
                          Phone
                        </TableHead>
                        <TableHead className="text-navy font-semibold">
                          From
                        </TableHead>
                        <TableHead className="text-navy font-semibold">
                          To
                        </TableHead>
                        <TableHead className="text-navy font-semibold">
                          Service
                        </TableHead>
                        <TableHead className="text-navy font-semibold">
                          Message
                        </TableHead>
                        <TableHead className="text-navy font-semibold">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotes.map((q, idx) => (
                        <TableRow
                          key={String(q.id)}
                          data-ocid={`admin.quotes.row.${idx + 1}`}
                          className="border-navy/8 hover:bg-navy/2"
                        >
                          <TableCell className="text-gray-400 text-xs font-mono">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="font-medium text-navy">
                            {q.name}
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">
                            <a
                              href={`mailto:${q.email}`}
                              className="hover:text-gold transition-colors"
                            >
                              {q.email}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">
                            <a
                              href={`tel:${q.phone}`}
                              className="hover:text-gold transition-colors"
                            >
                              {q.phone}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {q.from}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {q.to}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                q.serviceType === ServiceType.fullTruckLoad
                                  ? "bg-navy/10 text-navy hover:bg-navy/10 border-0"
                                  : q.serviceType === ServiceType.lTLTruckLoad
                                    ? "bg-gold/15 text-gold-dark hover:bg-gold/15 border-0"
                                    : "bg-green-100 text-green-700 hover:bg-green-100 border-0"
                              }
                            >
                              {SERVICE_LABELS[q.serviceType] ?? q.serviceType}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm max-w-[200px] truncate">
                            {q.message || (
                              <span className="text-gray-300 italic">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-gray-400 text-xs whitespace-nowrap">
                            {formatNanos(q.timestampNanos)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="text-center py-8 text-gray-400 text-xs">
        © {new Date().getFullYear()} TGT Solutions — Admin Portal
      </footer>
    </div>
  );
}
