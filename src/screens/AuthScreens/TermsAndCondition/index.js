import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {fonts} from '../../../Themes/FontsConfig';
import {useSelector} from 'react-redux';
import Header from '../../../components/Header';

const TermsAndCondition = ({navigation}) => {
    const {fontChange} = useSelector((state) => state.appReducer);
    const font = fonts(fontChange);
    return (<View style={{...styles.mainContainer, backgroundColor: 'black'}}>
            <Header isLeftIcon isCenterText isRightIcon navigation={navigation}/>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                    style={{
                        ...styles.headingStyle, color: 'white', fontFamily: font.bold,
                    }}
                >
                    Terms & Conditions
                </Text>

                <Text
                    style={{
                        ...styles.subTitleStyle, color: 'white', fontFamily: font.regular,
                    }}
                >
                    {'\n'}
                    <Text
                        style={{
                            fontFamily: font.bold,
                        }}
                    >
                        PLEASE READ THESE TERMS BEFORE USING MEMEE{' '}
                    </Text>
                    {'\n\n'}
                    These terms of use are entered into by and between you and Memee
                    ("Memee", "we" or "us"). The following terms and conditions, together
                    with any documents they expressly incorporate by reference
                    (collectively, these "Terms of Use"), govern your access to and use of
                    Memee, including any content, functionality and services offered on or
                    through any other (the "App" or the “Website”).
                    {'\n'}
                    Please read the Terms of Use carefully before you start to use the
                    App. By using the App or by clicking to accept or agree to the Terms
                    of Use when this option is made available to you, you accept and agree
                    to be bound and abide by these Terms of Use in addition to our Privacy
                    Policy incorporated herein by reference. If you do not to agree to
                    these Terms of Use or the Privacy Policy, you must not access or use
                    the App.
                    {'\n'}
                    <Text
                        style={{
                            fontFamily: font.bold,
                        }}
                    >
                        Basic Terms
                    </Text>
                    {'\n\n'}• You must be 13 years or older to use this App. {'\n'}• You
                    may not post nude, partially nude, or sexually suggestive photos.{' '}
                    {'\n'}• You are responsible for any activity that occurs under your
                    screen name. {'\n'}• You are responsible for keeping your password
                    secure. {'\n'}• You must not abuse, harass, threaten, impersonate or
                    intimidate other Memee users. {'\n'}• You may not use the Memee
                    service for any illegal or unauthorized purpose. International users
                    agree to comply with all local laws regarding online conduct and
                    acceptable content. {'\n'}• You are solely responsible for your
                    conduct and any data, text, information, screen names, graphics,
                    photos, profiles, audio and video clips, links ("Content") that you
                    submit, post, and display on the Memee service. {'\n'}• You must not
                    modify, adapt or hack Memee or modify another website so as to falsely
                    imply that it is associated with Memee. {'\n'}• You must not access
                    Memee's private API by any other means other than the Memee
                    application itself. {'\n'}• You must not crawl, scrape, or otherwise
                    cache any content from Memee including but not limited to user
                    profiles and photos. {'\n'}• You must not create or submit unwanted
                    email or comments to any Memee members ("Spam"). {'\n'}• You must not
                    use web URLs in your name without prior written consent from Memee,
                    inc. {'\n'}• You must not transmit any worms or viruses or any code of
                    a destructive nature. {'\n'}• You must not, in the use of Memee,
                    violate any laws in your jurisdiction (including but not limited to
                    copyright laws). {'\n'}• Violation of any of these agreements will
                    result in the termination of your Memee account. While Memee prohibits
                    such conduct and content on its site, you understand and agree that
                    Memee cannot be responsible for the Content posted on its web site and
                    you nonetheless may be exposed to such materials and that you use the
                    Memee service at your own risk.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold,
                        }}
                    >
                        General Conditions
                    </Text>
                    {'\n'}• We reserve the right to modify or terminate the Memee service
                    for any reason, without notice at any time. {'\n'}• We reserve the
                    right to alter these Terms of Use at any time. If the alterations
                    constitute a material change to the Terms of Use, we will notify you
                    via internet mail according to the preference expressed on your
                    account. What constitutes a "material change" will be determined at
                    our sole discretion, in good faith and using common sense and
                    reasonable judgement. {'\n'}• We reserve the right to refuse service
                    to anyone for any reason at any time. {'\n'}• We reserve the right to
                    force forfeiture of any username that becomes inactive, violates
                    trademark, or may mislead other users. {'\n'}• We may, but have no
                    obligation to, remove Content and accounts containing Content that we
                    determine in our sole discretion are unlawful, offensive, threatening,
                    libelous, defamatory, obscene or otherwise objectionable or violates
                    any party's intellectual property or these Terms of Use. {'\n'}• We
                    reserve the right to reclaim usernames on behalf of businesses or
                    individuals that hold legal claim or trademark on those usernames.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold,
                        }}
                    >
                        Proprietary Rights in Content on Memee
                    </Text>
                    {' \n\n'}• Memee does NOT claim ANY ownership rights in the text,
                    files, images, photos, video, sounds, musical works, works of
                    authorship, applications, or any other materials (collectively,
                    "Content") that you post on or through the Memee Services. By
                    displaying or publishing ("posting") any Content on or through the
                    Memee Services, you hereby grant to Memee a non-exclusive, fully paid
                    and royalty-free, worldwide, limited license to use, modify, delete
                    from, add to, publicly perform, publicly display, reproduce and
                    translate such Content, including without limitation distributing part
                    or all of the Site in any media formats through any media channels,
                    except Content not shared publicly ("private") will not be distributed
                    outside the Memee Services. {'\n'}• Some of the Memee Services are
                    supported by advertising revenue and may display advertisements and
                    promotions, and you hereby agree that Memee may place such advertising
                    and promotions on the Memee Services or on, about, or in conjunction
                    with your Content. The manner, mode and extent of such advertising and
                    promotions are subject to change without specific notice to you.{' '}
                    {'\n'}• You represent and warrant that: (i) you own the Content posted
                    by you on or through the Memee Services or otherwise have the right to
                    grant the license set forth in this section, (ii) the posting and use
                    of your Content on or through the Memee Services does not violate the
                    privacy rights, publicity rights, copyrights, contract rights,
                    intellectual property rights or any other rights of any person, and
                    (iii) the posting of your Content on the Site does not result in a
                    breach of contract between you and a third party. You agree to pay for
                    all royalties, fees, and any other monies owing any person by reason
                    of Content you post on or through the Memee Services. {'\n'}• The
                    Memee Services contain Content of Memee ("Memee Content"). Memee
                    Content is protected by copyright, trademark, patent, trade secret and
                    other laws, and Memee owns and retains all rights in the Memee Content
                    and the Memee Services. Memee hereby grants you a limited, revocable,
                    nonsublicensable license to reproduce and display the Memee Content
                    (excluding any software code) solely for your personal use in
                    connection with viewing the Site and using the Memee Services. {'\n'}•
                    The Memee Services contain Content of Users and other Memee licensors.
                    Except as provided within this Agreement, you may not copy, modify,
                    translate, publish, broadcast, transmit, distribute, perform, display,
                    or sell any Content appearing on or through the Memee Services. {'\n'}
                    • Memee performs technical functions necessary to offer the Memee
                    Services, including but not limited to transcoding and/or reformatting
                    Content to allow its use throughout the Memee Services. {'\n'}•
                    Although the App and other Memee Services are normally available,
                    there will be occasions when the Site or other Memee Services will be
                    interrupted for scheduled maintenance or upgrades, for emergency
                    repairs, or due to failure of telecommunications links and equipment
                    that are beyond the control of Memee. Also, although Memee will
                    normally only delete Content that violates this Agreement, Memee
                    reserves the right to delete any Content for any reason, without prior
                    notice. Deleted content may be stored by Memee in order to comply with
                    certain legal obligations and is not retrievable without a valid court
                    order. Consequently, Memee encourages you to maintain your own backup
                    of your Content. In other words, Memee is not a backup service. Memee
                    will not be liable to you for any modification, suspension, or
                    discontinuation of the Memee Services, or the loss of any Content.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold,
                        }}
                    >
                        Representation and Warranties
                    </Text>
                    {'\n'}
                    You represent and warrant to us that: (a) you are at least thirteen
                    (13) years of age; (b) you are eligible to register and use the App
                    and have the right, power, and ability to enter into and perform under
                    the App; (c) any information you provide in connection with the App,
                    including your business name, accurately and truthfully represents
                    your business or personal identity; (d) you and all transactions
                    initiated by you will comply with all federal, state, and local laws,
                    rules, and regulations applicable to you and/or your business; (e) you
                    will not use the App, directly or indirectly, for any fraudulent
                    undertaking or in any manner so as to interfere with the operation of
                    the App; and (f) your use of the App will be in compliance with these
                    Terms of Use.
                    {'\n'}
                    <Text
                        style={{
                            fontFamily: font.bold,
                        }}
                    >
                        Revision, Changes, Disclosures, and Notices
                    </Text>
                    {'\n'}
                    We may revise and update these Terms of Use from time to time in our
                    sole discretion. All changes are effective immediately when we post
                    them.{'\n'}
                    Your continued use of the App following the posting of revised Terms
                    of Use means that you accept and agree to the changes. You are
                    expected to check this page frequently so you are aware of any
                    changes, as they are binding on you.
                    {'\n\n'}
                    We may amend the Terms of Use at any time with notice that we deem to
                    be reasonable under the circumstances, by posting the revised version
                    on our App or communicating it to you through E-Mail (each a “Revised
                    Version”). The Revised Version will be effective as of the time it is
                    posted, but will not apply retroactively. Your continued use of the
                    App constitutes your acceptance of such Revised Version. Any dispute
                    that arose before the changes will be governed by the Terms of Use in
                    place when the dispute arose.
                    {'\n\n'}
                    We may provide disclosures and notices required by law and other
                    information about your Memee Account to you electronically, by posting
                    it on our App, pushing notifications through the Memee Account, or by
                    emailing it to the email address listed in your Memee Account.
                    Electronic disclosures and notices have the same meaning and effect as
                    if we had provided you with paper copies. Such disclosures and notices
                    are considered received by you within twenty-four (24) hours of the
                    time posted to our App, or within twenty-four (24) hours of the time
                    emailed to you unless we receive notice that the email was not
                    delivered. If you wish to withdraw your consent to receiving
                    electronic communications, contact Memee Support.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Intellectual Property Rights
                    </Text>
                    {'\n'}
                    The App and its entire contents, features and functionality (including
                    but not limited to all information, software, text, displays, images,
                    video and audio, and the design, selection and arrangement thereof),
                    are owned by Memee, its licensors or other providers of such material
                    and are protected by copyright, trademark, patent, trade secret and
                    other intellectual property or proprietary rights laws.
                    {'\n\n'}
                    Unless otherwise marked: (a) all material, data, and information on
                    the App, such as data files, text, music, audio files or other sounds,
                    photographs, videos, or other images, but excluding any software or
                    computer code (collectively, the “Non- Code Content”) is licensed; and
                    (b) all software or computer code (collectively, the “Code Content”)
                    is licensed.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Trademarks
                    </Text>
                    {'\n\n'}
                    The Memee name, logo and all related names, logos, product and service
                    names, designs and slogans are trademarks of Memee or its affiliates
                    or licensors. You must not use such marks without the prior written
                    permission of Memee.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Prohibited Uses
                    </Text>
                    {'\n\n'}• You may use the App only for lawful purposes and in
                    accordance with these Terms of Use. You agree not to use the App:{' '}
                    {'\n'}• In any way that violates any applicable federal, state, local
                    or international law or regulation (including, without limitation, any
                    laws regarding the export of data or software to and from the US or
                    other countries). {'\n'}• For the purpose of exploiting, harming or
                    attempting to exploit or harm minors in any way by exposing them to
                    inappropriate content, asking for personally identifiable information
                    or otherwise. {'\n'}• To send, knowingly receive, upload, download,
                    use or re-use any material which does not comply with these Terms of
                    Use. {'\n'}• To transmit, or procure the sending of, any advertising
                    or promotional material without our prior written consent, including
                    any "junk mail", "chain letter" or "spam" or any other similar
                    solicitation. {'\n'}• To impersonate or attempt to impersonate Memee,
                    a Memee employee, another user or any other person or entity
                    (including, without limitation, by using e-mail addresses or screen
                    names associated with any of the foregoing). {'\n'}• To engage in any
                    other conduct that restricts or inhibits anyone's use or enjoyment of
                    the App, or which, as determined by us, may harm Memee or users of the
                    App or expose them to liability.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Additionally, you agree not to:
                    </Text>
                    {'\n\n'}• Use the App in any manner that could disable, overburden,
                    damage, or impair the site or interfere with any other party's use of
                    the App. {'\n'}• Use any robot, spider or other automatic device,
                    process or means to access the App for any purpose, including
                    monitoring or copying any of the material on the App. {'\n'}• Use any
                    manual process to monitor or copy any of the material on the App or
                    for any other unauthorized purpose without our prior written consent.
                    {'\n'}• Use any device, software or routine that interferes with the
                    proper working of the App. {'\n'}• Introduce any viruses, trojan
                    horses, worms, logic bombs or other material which is malicious or
                    technologically harmful. {'\n'}• Attempt to gain unauthorized access
                    to, interfere with, damage or disrupt any parts of the App, the server
                    on which the App is stored, or any server, computer or database
                    connected to the App. {'\n'}• Attack the App via a denial-of-service
                    attack or a distributed denial-of-service attack. • Otherwise attempt
                    to interfere with the proper working of the App. • Transfer any rights
                    granted to you under the Terms of Use. • Use the App in a way that
                    distracts or prevents you from obeying traffic or safety laws. • Use
                    the App for the sale of firearms, firearm parts, ammunition, weapons
                    or other devices designed to cause physical harm.
                    {'\n\n'}
                    If we reasonably suspect that your Memee Account has been used for an
                    unauthorized, illegal, or criminal purpose, you give us express
                    authorization to share information about you, your Memee Account, and
                    any of your transactions with law enforcement.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold,
                        }}
                    >
                        Reliance on Information Posted
                    </Text>
                    {'\n\n'}
                    The information presented on or through the App is made available
                    solely for general information purposes. We do not warrant the
                    accuracy, completeness or usefulness of this information. Any reliance
                    you place on such information is strictly at your own risk. We
                    disclaim all liability and responsibility arising from any reliance
                    placed on such materials by you or any other visitor to the App, or by
                    anyone who may be informed of any of its contents.
                    {'\n\n'}
                    This App includes content provided by third parties, including
                    materials provided by other users, bloggers and third-party licensors,
                    syndicators, aggregators and/or reporting services. All statements
                    and/or opinions expressed in these materials, and all articles and
                    responses to questions and other content, other than the content
                    provided by Memee, are solely the opinions and the responsibility of
                    the person or entity providing those materials. These materials do not
                    necessarily reflect the opinion of the Memee. We are not responsible,
                    or liable to you or any third party, for the content or accuracy of
                    any materials provided by any third parties.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.regular, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        App Visits and Information
                    </Text>
                    {'\n'}
                    All information we collect on this App is subject to our Privacy
                    Policy. By using the App, you consent to all actions taken by us with
                    respect to your information in compliance with the Privacy Policy.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Other Terms and Conditions
                    </Text>
                    {'\n\n'}
                    Additional terms and conditions may also apply to specific portions,
                    services or features of the App. All such additional terms and
                    conditions are hereby incorporated by this reference into these Terms
                    of Use.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Linking to the App and Social Media Features
                    </Text>
                    {'\n\n'}
                    You may link to our homepage App, provided you do so in a way that is
                    fair and legal and does not damage our reputation or take advantage of
                    it, but you must not establish a link in such a way as to suggest any
                    form of association, approval or endorsement on our part without our
                    express written consent.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Links from the App
                    </Text>
                    {'\n\n'}
                    If the App contains links to other sites and resources provided by
                    third parties, these links are provided for your convenience only.
                    This includes links contained in advertisements, including banner
                    advertisements and sponsored links. We have no control over the
                    contents of those sites or resources, and accept no responsibility for
                    them or for any loss or damage that may arise from your use of them.
                    If you decide to access any of the third party App linked to this App,
                    you do so entirely at your own risk and subject to the terms and
                    conditions of use for such App. We reserve the right to withdraw
                    linking permission without notice.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Geographic Restrictions
                    </Text>
                    {'\n\n'}
                    We make no claims that the App or any of its content is accessible or
                    appropriate outside of the United Kingdom. Access to the App may not
                    be legal by certain persons or in certain countries. If you access the
                    App from outside the United Kingdom, you do so on your own initiative
                    and are responsible for compliance with local laws.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Disclaimer of Warranties
                    </Text>
                    {'\n\n'}
                    You understand that we cannot and do not guarantee or warrant that
                    files available for downloading from the internet or the App will be
                    free of viruses or other destructive code. You are responsible for
                    implementing sufficient procedures and checkpoints to satisfy your
                    particular requirements for anti-virus protection and accuracy of data
                    input and output, and for maintaining a means external to our site for
                    any reconstruction of any lost data. WE WILL NOT BE LIABLE FOR ANY
                    LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK,
                    VIRUSES OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR
                    COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA OR OTHER PROPRIETARY
                    MATERIAL DUE TO YOUR USE OF THE APP OR ANY SERVICES OR ITEMS OBTAINED
                    THROUGH THE APP OR TO YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT,
                    OR ON ANY APP LINKED TO IT.
                    {'\n\n'}
                    YOUR USE OF THE APP, ITS CONTENT AND ANY SERVICES OR ITEMS OBTAINED
                    THROUGH THE APP IS AT YOUR OWN RISK. THE APP, ITS CONTENT AND ANY
                    SERVICES OR ITEMS OBTAINED THROUGH THE APP ARE PROVIDED ON AN "AS IS"
                    AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER
                    EXPRESS OR IMPLIED. NEITHER THE MEMEE NOR ANY PERSON ASSOCIATED WITH
                    THE MEMEE MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE
                    COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY OR AVAILABILITY
                    OF THE APP. WITHOUT LIMITING THE FOREGOING, NEITHER MEMEE NOR ANYONE
                    ASSOCIATED WITH MEMEE REPRESENTS OR WARRANTS THAT THE APP, ITS CONTENT
                    OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE APP WILL BE ACCURATE,
                    RELIABLE, ERROR-FREE OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED,
                    THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF
                    VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE APP OR ANY SERVICES OR
                    ITEMS OBTAINED THROUGH THE APP WILL OTHERWISE MEET YOUR NEEDS OR
                    EXPECTATIONS.
                    {'\n\n'}
                    MEMEE HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
                    IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY
                    WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT AND FITNESS FOR
                    PARTICULAR PURPOSE. {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Limitation on Liability
                    </Text>
                    {'\n\n'}IN NO EVENT WILL THE MEMEE, ITS AFFILIATES OR THEIR LICENSORS,
                    SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS OR DIRECTORS BE LIABLE
                    FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN
                    CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE APP, ANY APP LINKED
                    TO IT, ANY CONTENT ON THE APP OR SUCH OTHER APP OR ANY SERVICES OR
                    ITEMS OBTAINED THROUGH THE APP OR SUCH OTHER APP, INCLUDING ANY
                    DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE
                    DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND
                    SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS
                    OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL,
                    LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE),
                    BREACH OF CONTRACT OR OTHERWISE, EVEN IF FORESEEABLE. THE FOREGOING
                    DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED
                    UNDER APPLICABLE LAW WHICH MAY INCLUDE FRAUD. {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Indemnification
                    </Text>
                    {'\n\n'}
                    You agree to defend, indemnify and hold harmless Memee, its
                    affiliates, licensors and service providers, and its and their
                    respective officers, directors, employees, contractors, agents,
                    licensors, suppliers, successors and assigns from and against any
                    claims, liabilities, damages, judgments, awards, losses, costs,
                    expenses or fees (including reasonable attorneys' fees) arising out of
                    or relating to your violation of these Terms of Use or your use of the
                    App, including, but not limited to, any use of the App's content,
                    services and products other than as expressly authorized in these
                    Terms of Use or your use of any information obtained from the App.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Governing Law and Venue{' '}
                    </Text>
                    {'\n\n'}These Terms will be governed by and construed and enforced in
                    accordance with the laws of United Kingdom, without regard to conflict
                    of law rules that would cause the application of the laws of any other
                    jurisdiction. {'\n\n'}{' '}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Dispute Resolution
                    </Text>{' '}
                    {'\n\n'}Any any dispute arising out of or in connection to this Terms
                    of Use, including any question regarding its existence, validity, or
                    termination, tshall first seek settlement of that dispute by mediation
                    in accordance with the rules of the International Chamber of Commerce
                    (ICC) Mediation Rules, which procedure is deemed to be incorporated by
                    reference in this clause. {'\n\n'}If the dispute is not settled by
                    mediation within 30 days of the appointment of the mediator, or such
                    further period as the Memee and the user shall agree in writing, the
                    dispute shall be referred to and finally settled through binding
                    arbitration under the Rules of Arbitration of the ICC.
                    {'\n\n'}
                    The number of appointed arbitrators shall be one or more in accordance
                    with the said Rules of Arbitration. {'\n\n'}The seat, or legal place,
                    of arbitration, shall be London, United Kingdom.{'\n\n'} The language
                    to be used in the arbitral proceedings shall be in English.
                    {'\n\n\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Severability
                    </Text>
                    {'\n\n'} If any term, clause or provision of these Terms is held
                    unlawful, void or unenforceable, then that term, clause or provision
                    will be severable from these Terms and will not affect the validity or
                    enforceability of any remaining part of that term, clause or
                    provision, or any other term, clause or provision of these Terms.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Waiver
                    </Text>
                    {'\n\n'} No waiver of Memee of any term or condition set forth in
                    these Terms of Use shall be deemed a further or continuing waiver of
                    such term or condition or a waiver of any other term or condition, and
                    any failure of Memee to assert a right or provision under these Terms
                    of Use shall not constitute a waiver of such right or provision.
                    {'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold, fontStyle: 'italic', fontWeight: 'bold',
                        }}
                    >
                        Micellanous
                    </Text>
                    {'\n\n'}We may assign our rights and obligations under these Terms of
                    Use. We will not be liable for any delay or failure to perform any
                    obligation under these Terms where the delay or failure results from
                    any cause beyond our reasonable control. This App does not create any
                    form of partnership, joint venture or any other similar relationship
                    between you and us. Except as otherwise provided herein, these Terms
                    are intended solely for the benefit of you and us and are not intended
                    to confer third-party beneficiary rights upon any other person or
                    entity. You agree and acknowledge that all agreements, notices,
                    disclosures, and other communications that we provide to you,
                    including these Terms of Use, will be provided in electronic form.
                    {'\n\n'}The Terms of Use, our Privacy Policy constitute the sole and
                    entire agreement between you and Memee with respect to the App and
                    supersede all prior and contemporaneous understandings, agreements,
                    representations and warranties, both written and oral, with respect to
                    the App.{'\n\n'}Your Comments and Concerns {'\n\n'}This App is
                    operated by Memee. All other feedback, comments, requests for
                    technical support and other communications relating to the App should
                    be directed to: [XX].{'\n\n'}
                    <Text
                        style={{
                            fontFamily: font.bold,
                        }}
                    >
                        LAST UPDATED{' '}
                    </Text>
                    [1.0]
                </Text>
            </ScrollView>
        </View>);
};

export default TermsAndCondition;

const styles = {
    mainContainer: {
        flex: 1,
    }, container: {
        marginTop: hp(2), marginHorizontal: wp(8),
    }, headingStyle: {
        fontSize: wp(7), marginHorizontal: wp(5), marginTop: hp(1),
    }, subTitleStyle: {
        fontSize: wp(4), marginTop: hp(1), lineHeight: hp(3), marginHorizontal: wp(5), opacity: 0.8,
    },

    arrowStyle: {
        justifyContent: 'center', height: hp(8), marginHorizontal: wp(5),
    },
};
