import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpSupport = ({ navigation }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const supportOptions = [
    {
      id: 1,
      title: 'Call Us',
      subtitle: '+91 1800-XXX-XXXX (Toll Free)',
      icon: 'call',
      color: '#10B981',
      action: () => handleCall('+911800XXXXXXX'),
    },
    {
      id: 2,
      title: 'WhatsApp Support',
      subtitle: 'Chat with us on WhatsApp',
      icon: 'logo-whatsapp',
      color: '#25D366',
      action: () => handleWhatsApp('+919876543210'),
    },
    {
      id: 3,
      title: 'Email Support',
      subtitle: 'support@loanapp.com',
      icon: 'mail',
      color: '#5D6AFF',
      action: () => handleEmail('support@loanapp.com'),
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I apply for a loan?',
      answer: 'Tap on "Apply for New Loan" from the dashboard, select your preferred loan type, fill in the required details, upload necessary documents, and submit your application. Our team will review and get back to you within 24-48 hours.',
    },
    {
      id: 2,
      question: 'What documents are required?',
      answer: 'You will need: Valid ID proof (Aadhaar, PAN card), Address proof, Income proof (salary slips/bank statements for last 3 months), and passport-size photographs. Additional documents may be required based on loan type.',
    },
    {
      id: 3,
      question: 'How can I track my loan application?',
      answer: 'You can track your application status from the dashboard. Tap on "Track Your Application" card or go to Quick Actions and select "Track Status". You will see real-time updates on your application progress.',
    },
    {
      id: 4,
      question: 'How long does loan approval take?',
      answer: 'Personal loans are typically approved within 24-48 hours. Home loans and business loans may take 3-7 business days depending on document verification and eligibility assessment.',
    },
    {
      id: 5,
      question: 'How do I pay my EMI?',
      answer: 'You can pay your EMI through the app using UPI, net banking, debit/credit card, or set up auto-debit from your bank account. Go to Quick Actions and tap "Pay EMI" to make payments.',
    },
    {
      id: 6,
      question: 'Can I prepay my loan?',
      answer: 'Yes, you can prepay your loan partially or fully. There may be prepayment charges depending on your loan agreement. Contact support or check your loan details for more information.',
    },
    {
      id: 7,
      question: 'What if I miss an EMI payment?',
      answer: 'Missing an EMI payment may result in late payment charges and can affect your credit score. Contact our support team immediately if you are facing difficulty in making payments. We can discuss alternative payment arrangements.',
    },
    {
      id: 8,
      question: 'How is my credit score calculated?',
      answer: 'Your credit score is calculated based on your payment history, credit utilization, length of credit history, types of credit, and recent credit inquiries. Regular EMI payments help improve your score.',
    },
  ];

  const quickLinks = [
    // {
    //   id: 1,
    //   title: 'EMI Calculator',
    //   icon: 'calculator-outline',
    //   screen: 'EMICalculator',
    // },
    // {
    //   id: 2,
    //   title: 'Loan Terms & Conditions',
    //   icon: 'document-text-outline',
    //   screen: 'TermsConditions',
    // },
    {
      id: 3,
      title: 'Privacy Policy',
      icon: 'shield-checkmark-outline',
      screen: 'PrivacyPolicy',
    },
    {
      id: 4,
      title: 'About App',
      icon: 'information-circle-outline',
      screen: 'AboutApp',
    },
  ];

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(() =>
      Alert.alert('Error', 'Unable to make a call')
    );
  };

  const handleWhatsApp = (phoneNumber) => {
    const message = 'Hello, I need help regarding my loan application.';
    Linking.openURL(
      `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    ).catch(() =>
      Alert.alert('Error', 'WhatsApp is not installed on your device')
    );
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`).catch(() =>
      Alert.alert('Error', 'Unable to open email client')
    );
  };

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Raise Ticket Button */}
        <View style={styles.raiseTicketSection}>
          <TouchableOpacity
            style={styles.raiseTicketButton}
            onPress={() => navigation.navigate('RaiseTicket')}
          >
            <View style={styles.raiseTicketContent}>
              <View style={styles.raiseTicketIconContainer}>
                <Icon name="create-outline" size={32} color="white" />
              </View>
              <View style={styles.raiseTicketTextContainer}>
                <Text style={styles.raiseTicketTitle}>Raise a Support Ticket</Text>
                <Text style={styles.raiseTicketSubtitle}>
                  Submit your issue and we'll get back to you
                </Text>
              </View>
              <Icon name="chevron-forward" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          {supportOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.supportCard}
              onPress={option.action}
            >
              <View
                style={[styles.supportIconContainer, { backgroundColor: option.color + '15' }]}
              >
                <Icon name={option.icon} size={28} color={option.color} />
              </View>
              <View style={styles.supportInfo}>
                <Text style={styles.supportTitle}>{option.title}</Text>
                <Text style={styles.supportSubtitle}>{option.subtitle}</Text>
              </View>
              <Icon name="chevron-forward" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Operating Hours */}
        <View style={styles.card}>
          <View style={styles.hoursHeader}>
            <Icon name="time-outline" size={24} color="#5D6AFF" />
            <Text style={styles.hoursTitle}>Operating Hours</Text>
          </View>
          <View style={styles.hoursContent}>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursLabel}>Monday - Friday</Text>
              <Text style={styles.hoursValue}>9:00 AM - 6:00 PM</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursLabel}>Saturday</Text>
              <Text style={styles.hoursValue}>9:00 AM - 1:00 PM</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursLabel}>Sunday</Text>
              <Text style={styles.hoursValue}>Closed</Text>
            </View>
          </View>
          <View style={styles.emergencyNote}>
            <Icon name="information-circle" size={16} color="#F59E0B" />
            <Text style={styles.emergencyText}>
              For emergencies, WhatsApp support is available 24/7
            </Text>
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqCard}
              onPress={() => toggleFAQ(faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Icon
                  name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="#5D6AFF"
                />
              </View>
              {expandedFAQ === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinksGrid}>
            {quickLinks.map((link) => (
              <TouchableOpacity
                key={link.id}
                style={styles.quickLinkCard}
                onPress={() => navigation.navigate(link.screen)}
              >
                <Icon name={link.icon} size={32} color="#5D6AFF" />
                <Text style={styles.quickLinkText}>{link.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feedback */}
        {/* <View style={styles.card}>
          <View style={styles.feedbackHeader}>
            <Icon name="chatbubble-ellipses-outline" size={24} color="#5D6AFF" />
            <Text style={styles.feedbackTitle}>Send Us Feedback</Text>
          </View>
          <Text style={styles.feedbackText}>
            We value your feedback! Help us improve by sharing your thoughts and suggestions.
          </Text>
          <TouchableOpacity
            style={styles.feedbackButton}
            onPress={() => navigation.navigate('Feedback')}
          >
            <Text style={styles.feedbackButtonText}>Write Feedback</Text>
            <Icon name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#5D6AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  raiseTicketSection: {
    padding: 20,
    paddingBottom: 0,
  },
  raiseTicketButton: {
    backgroundColor: '#5D6AFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#5D6AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  raiseTicketContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  raiseTicketIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  raiseTicketTextContainer: {
    flex: 1,
  },
  raiseTicketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  raiseTicketSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  supportCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  supportIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  hoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  hoursContent: {
    gap: 12,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  hoursValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  emergencyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  emergencyText: {
    flex: 1,
    fontSize: 12,
    color: '#92400E',
  },
  faqCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    paddingRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickLinkCard: {
    backgroundColor: 'white',
    width: '48%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  feedbackText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  feedbackButton: {
    backgroundColor: '#5D6AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  feedbackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 20,
  },
});

export default HelpSupport;

