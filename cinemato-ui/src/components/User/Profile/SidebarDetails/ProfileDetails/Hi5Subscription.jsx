import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, X, AlertCircle, Star, Zap, Crown, ArrowUp, Sparkles } from "lucide-react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosInstance from "../../../../../axiosConfig";
import { ImSpinner2 } from 'react-icons/im';
import { BsStripe } from 'react-icons/bs';
import showToast from "../../../../../utils/ToastNotifier";
import { useSelector } from "react-redux";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchParams] = useSearchParams();
  const subscriptionId = searchParams.get("success_subscription_id");
  const {subscription} = useSelector((state) => state.user)
  console.log("subscriptionssssss active:", subscription)

  useEffect(() => {
    if (subscriptionId) {
      showToast("success", "Payment Successfully Completed!");
      const params = new URLSearchParams(searchParams);
      params.delete("success_subscription_id");
      navigate({
        pathname: "/profile",
        search: params.toString()
      }, { replace: true });
    }
  }, [subscriptionId]);
  
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get('subscription/plans/');
        const sortedPlans = response.data.sort((a, b) => a.price - b.price);
        setPlans(sortedPlans);
        
        // Set default selected plan (basic plan - lowest price)
        if (sortedPlans.length > 0) {
          setSelectedPlan(sortedPlans[0]);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        showToast('error', 'Failed to load subscription plans');
      } finally {
        setLoading(false);
      }
    };
    
    const fetchActiveSubscription = async () => {
      try {
        const response = await axiosInstance.get('subscription/active/');
        console.log("active plans: ", response.data);
        setActiveSubscription(response.data);
      } catch (error) {
        console.error("Failed to fetch active subscription:", error);
      }
    };
    
    fetchPlans();
    fetchActiveSubscription();
  }, [subscriptionId]);

  // Set selected plan to active subscription when available
  useEffect(() => {
    if (activeSubscription && plans.length > 0) {
      const activePlan = plans.find(plan => plan.id === activeSubscription.plan.id);
      if (activePlan) {
        setSelectedPlan(activePlan);
      }
    }
  }, [activeSubscription, plans]);
  
  const handleSubscribe = async (planId) => {
    setProcessingPayment(planId);
    setPaymentError(null);
    
    try {
      const { data } = await axiosInstance.post('subscription/create-checkout-session/', {
        plan_id: planId
      });
      
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      
      if (error) {
        console.error("Stripe redirect error:", error.message);
        setPaymentError("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setPaymentError("Failed to create checkout session. Please try again.");
    } finally {
      setProcessingPayment("");
    }
  };
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');
    
    if (sessionId) {
      const verifySubscription = async () => {
        try {
          const response = await axiosInstance.post('subscription/verify-subscription/', {
            session_id: sessionId
          });
          
          setActiveSubscription(response.data);
          showToast('success', 'Subscription activated successfully!');
          navigate('/dashboard');
        } catch (error) {
          console.error("Failed to verify subscription:", error);
          showToast('error', 'Failed to verify subscription');
        }
      };
      
      verifySubscription();
    }
  }, []);

  const getPlanIcon = (index) => {
    const icons = [Star, Zap, Crown];
    return icons[index] || Star;
  };

  const getPlanColor = (index) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-purple-500 to-pink-600', 
      'from-pink-500 to-red-600'
    ];
    return colors[index] || colors[0];
  };

  const getUpgradeAmount = (currentPlan, basePlan) => {
    return currentPlan.price - basePlan.price;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <ImSpinner2 className="animate-spin text-5xl text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your perfect plan...</p>
        </div>
      </div>
    );
  }

  const basePlan = plans[0];
  const upgradePlans = plans.slice(1);

  if (!selectedPlan) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-purple-800 font-medium">Premium Movie Experience</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
            Choose Your Cinema Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with our basic plan and upgrade anytime for more amazing benefits
          </p>
        </div>

        {/* Error Message */}
        {paymentError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-8 max-w-2xl mx-auto">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
              <p className="text-red-700">{paymentError}</p>
            </div>
          </div>
        )}

        {/* Active Subscription Banner */}
        {activeSubscription && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900">Active Subscription</h3>
                <p className="text-green-700">
                  You're enjoying <span className="font-medium">{activeSubscription.plan.name}</span> until {new Date(activeSubscription.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Selected Plan */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
              {/* Gradient Header */}
              <div className={`bg-gradient-to-r ${getPlanColor(plans.indexOf(selectedPlan))} p-8 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {React.createElement(getPlanIcon(plans.indexOf(selectedPlan)), { className: "w-8 h-8 mr-3" })}
                      <h2 className="text-3xl font-bold">{selectedPlan.name}</h2>
                    </div>
                    {activeSubscription?.plan.id === selectedPlan.id && (
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        Current Plan
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold">₹{selectedPlan.price}</span>
                    <span className="text-xl ml-2 opacity-90">per month</span>
                  </div>
                </div>
              </div>

              {/* Plan Features */}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">What's Included</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedPlan.monthly_movie_limit} Movies</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedPlan.daily_ticket_limit > 1 ? `${selectedPlan.daily_ticket_limit} Tickets` : '1 Ticket'}
                      </p>
                      <p className="text-sm text-gray-600">per day</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      {/* <p className="font-medium text-gray-900">₹{selectedPlan.max_discount_per_ticket} Discount</p> */}
                      <p className="font-medium text-gray-900">Upto ₹89 Discount</p>
                      <p className="text-sm text-gray-600">per ticket</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">₹{selectedPlan.max_ticket_price_coverage} Coverage</p>
                      <p className="text-sm text-gray-600">free ticket value</p>
                    </div>
                  </div>

                  <div className="flex items-start sm:col-span-2">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedPlan.valid_days.includes('ALL') 
                          ? 'Valid All Days' 
                          : `Valid: ${selectedPlan.valid_days.join(', ')}`}
                      </p>
                      <p className="text-sm text-gray-600">+ Exclusive merchant coupons</p>
                    </div>
                  </div>
                </div>

                {/* Subscribe Button */}
                {activeSubscription?.plan.id === selectedPlan.id ? (
  <button
    disabled
    className="w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 bg-gray-100 text-gray-500 cursor-not-allowed"
  >
    Currently Active
  </button>
) : null}

{!activeSubscription?.plan || activeSubscription?.plan.id === selectedPlan.id ? null : null}

{!activeSubscription?.plan && (
  <button
    onClick={() => handleSubscribe(selectedPlan.id)}
    disabled={processingPayment === selectedPlan.id}
    className={`w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-200 ${
      `bg-gradient-to-r ${getPlanColor(plans.indexOf(selectedPlan))} text-white hover:shadow-xl hover:scale-105 active:scale-95`
    }`}
  >
    {processingPayment === selectedPlan.id ? (
      <div className="flex items-center justify-center">
        <ImSpinner2 className="animate-spin mr-2" />
        Processing...
      </div>
    ) : 'Subscribe Now'}
  </button>
)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Your Plan</h3>
            
            <div 
              onClick={() => setSelectedPlan(basePlan)}
              className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-200 border-2 ${
                selectedPlan.id === basePlan.id 
                  ? 'border-blue-500 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-blue-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">{basePlan.name}</h4>
                </div>
                {activeSubscription?.plan.id === basePlan.id && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">₹{basePlan.price}</p>
              <p className="text-sm text-gray-600">Perfect for casual movie-goers</p>
            </div>

            {/* Upgrade Plans */}
            {upgradePlans.map((plan, index) => {
              const upgradeAmount = getUpgradeAmount(plan, basePlan);
              const Icon = getPlanIcon(index + 1);
              
              return (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-200 border-2 relative overflow-hidden ${
                    selectedPlan.id === plan.id 
                      ? 'border-purple-500 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  {/* Popular badge for middle plan */}
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full transform rotate-12">
                      Popular
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-purple-500 mr-2" />
                      <h4 className="font-semibold text-gray-900">{basePlan.name}</h4>
                    </div>
                    {activeSubscription?.plan.id === plan.id && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-600 mr-2">+</span>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
                      <span className="text-purple-700 font-semibold text-sm">₹{upgradeAmount} upgrade</span>
                    </div>
                  </div>
                  
                  {/* <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">₹{plan.price}</span>
                    <div className="ml-2 flex items-center">
                      <ArrowUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 ml-1">+{Math.round(((plan.monthly_movie_limit - basePlan.monthly_movie_limit) / basePlan.monthly_movie_limit) * 100)}% more movies</span>
                    </div>
                  </div> */}
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {index === 0 ? 'Great for regular movie lovers' : 'Ultimate cinema experience'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Questions about our plans?</p>
          <button className="text-purple-600 hover:text-purple-800 font-medium underline">
            Contact our support team
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;