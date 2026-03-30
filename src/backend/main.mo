import List "mo:core/List";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ServiceType = {
    #fullTruckLoad;
    #lTLTruckLoad;
    #customizedLogistic;
  };

  type QuoteRequest = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    from : Text;
    to : Text;
    serviceType : ServiceType;
    message : Text;
    timestampNanos : Int;
  };

  type QuoteRequestInput = {
    name : Text;
    email : Text;
    phone : Text;
    from : Text;
    to : Text;
    serviceType : ServiceType;
    message : Text;
  };

  var nextId : Nat = 0; // Simple persistent counter
  let quoteRequests = List.empty<QuoteRequest>();

  // Public: Anyone can submit a quote request
  public shared ({ caller }) func submitQuote(input : QuoteRequestInput) : async Nat {
    let id = nextId;
    nextId += 1;
    let newQuote : QuoteRequest = {
      id;
      name = input.name;
      email = input.email;
      phone = input.phone;
      from = input.from;
      to = input.to;
      serviceType = input.serviceType;
      message = input.message;
      timestampNanos = Time.now();
    };
    quoteRequests.add(newQuote);
    id;
  };

  // Admin only: Get quotes in time range
  public query ({ caller }) func getQuoteRequestsInTimeRange(startTimeNanos : Int, endTimeNanos : Int) : async [QuoteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can retrieve quote requests");
    };
    let rangeList = quoteRequests.values().filter(func(q) { q.timestampNanos >= startTimeNanos and q.timestampNanos <= endTimeNanos });
    rangeList.toArray();
  };

  // Admin only: Get top recent quotes
  public query ({ caller }) func getTopRecentQuotesByTimestamp(count : Nat) : async [QuoteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can retrieve quote requests");
    };
    if (count == 0) {
      return [];
    };
    quoteRequests.toArray().sliceToArray(0, Nat.min(count, quoteRequests.size()));
  };

  // Admin only: Get paginated quotes
  public query ({ caller }) func getQuoteRequests(pageSize : Nat, pageIndex : Nat) : async [QuoteRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can retrieve quote requests");
    };
    let startIndex = pageIndex * pageSize;
    if (pageSize == 0 or startIndex >= quoteRequests.size()) {
      return [];
    };
    quoteRequests.values().toArray().sliceToArray(startIndex, Nat.min(startIndex + pageSize, quoteRequests.size()));
  };

  // Public: Get quote count for stats
  public query func getQuoteCount() : async Nat {
    quoteRequests.size();
  };

  // Admin only: Get all quotes sorted by ID
  public query ({ caller }) func getAllQuoteRequestsSorted() : async [QuoteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can retrieve quote requests");
    };
    quoteRequests.toArray();
  };

  // Admin only: Get quotes for specific email
  public query ({ caller }) func getQuotesForEmail(email : Text) : async [QuoteRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can retrieve quote requests");
    };
    quoteRequests.filter(func(q) { q.email == email }).toArray();
  };

  // Admin only: Delete specific quote request
  public shared ({ caller }) func deleteQuoteRequest(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete quote requests");
    };
    let newList = quoteRequests.filter(func(q) { q.id != id });
    quoteRequests.clear();
    quoteRequests.addAll(newList.values());
  };

  // Admin only: Delete all quotes
  public shared ({ caller }) func deleteAllQuotes() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete quote requests");
    };
    quoteRequests.clear();
  };

  // Admin only: Delete quotes by email
  public shared ({ caller }) func deleteQuotesByEmail(email : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete quote requests");
    };
    let newList = quoteRequests.filter(func(q) { q.email != email });
    quoteRequests.clear();
    quoteRequests.addAll(newList.values());
  };

  // Admin only: Filter quotes by service type
  public query ({ caller }) func filterQuotesByServiceType(serviceType : ServiceType) : async [QuoteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can retrieve quote requests");
    };
    quoteRequests.filter(func(q) { q.serviceType == serviceType }).toArray();
  };

  // Admin only: Filter quotes by origin city
  public query ({ caller }) func filterQuotesByOriginCity(originCity : Text) : async [QuoteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can retrieve quote requests");
    };
    quoteRequests.filter(func(q) { q.from == originCity }).toArray();
  };

  // Admin only: Filter quotes by destination city
  public query ({ caller }) func filterQuotesByDestinationCity(destinationCity : Text) : async [QuoteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can retrieve quote requests");
    };
    quoteRequests.filter(func(q) { q.to == destinationCity }).toArray();
  };

  // Admin only: Search quotes for term
  public query ({ caller }) func searchQuotesForTerm(term : Text) : async [QuoteRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can retrieve quote requests");
    };
    quoteRequests.filter(
      func(q) {
        q.name.contains(#text term) or
        q.email.contains(#text term) or
        q.phone.contains(#text term) or
        q.from.contains(#text term) or
        q.to.contains(#text term) or
        q.message.contains(#text term)
      }
    ).toArray();
  };

  // Admin only: Edit quote
  public shared ({ caller }) func editQuote(id : Nat, input : QuoteRequestInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can edit quote requests");
    };

    // Find the existing quote to preserve timestamp
    let existingQuote = quoteRequests.find(func(q) { q.id == id });
    switch (existingQuote) {
      case (null) {
        Runtime.trap("Quote not found");
      };
      case (?existing) {
        let updatedQuote : QuoteRequest = {
          id;
          name = input.name;
          email = input.email;
          phone = input.phone;
          from = input.from;
          to = input.to;
          serviceType = input.serviceType;
          message = input.message;
          timestampNanos = existing.timestampNanos;
        };

        let newList = quoteRequests.filter(func(q) { q.id != id });
        quoteRequests.clear();
        quoteRequests.addAll(newList.values());
        quoteRequests.add(updatedQuote);
      };
    };
  };

  // Admin only: Update service type
  public shared ({ caller }) func updateServiceType(id : Nat, serviceType : ServiceType) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update quote requests");
    };

    let existingQuote = quoteRequests.find(func(q) { q.id == id });
    switch (existingQuote) {
      case (null) {
        Runtime.trap("Quote not found");
      };
      case (?existing) {
        let updatedQuote : QuoteRequest = {
          existing with serviceType
        };

        let newList = quoteRequests.filter(func(q) { q.id != id });
        quoteRequests.clear();
        quoteRequests.addAll(newList.values());
        quoteRequests.add(updatedQuote);
      };
    };
  };
};
