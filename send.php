<?php
// send.php: handles all three Placekeep contact forms.

// ---- CONFIG: change these ----
$TO   = 'hello@placekeep.studio';   // where submissions are delivered
$FROM = 'ContactForms@placekeep.studio';
$THANK_YOU = 'contact.html?sent=1';  // where non-JS submissions are sent afterward
// ------------------------------

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond($ok, $msg, $code = 200) {
    global $wantsJson, $THANK_YOU;
    if ($wantsJson) {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $msg]);
    } elseif ($ok) {
        header("Location: $THANK_YOU");
    } else {
        http_response_code($code);
        echo htmlspecialchars($msg) . ' <a href="contact.html">Go back</a>';
    }
    exit;
}

function clean_line($v) {   // single-line fields: strip tags and newlines (blocks header injection)
    return trim(str_replace(["\r", "\n"], ' ', strip_tags((string)$v)));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request.', 405);
}

// Honeypot: bots fill this hidden field, humans don't. Pretend success.
if (!empty($_POST['website'])) {
    respond(true, '');
}

$allowedTypes = [
    "I don't know where to start",
    'Project opportunity',
    'General outreach',
];

$type    = clean_line($_POST['inquiry_type'] ?? '');
$name    = clean_line($_POST['name'] ?? '');
$org     = clean_line($_POST['organization'] ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$message = trim(strip_tags($_POST['message'] ?? ''));

if (!in_array($type, $allowedTypes, true)) {
    respond(false, 'Invalid form.', 400);
}
if (!$email || $message === '') {
    respond(false, 'Please enter a valid email address and a message.', 400);
}
if (mb_strlen($message) > 5000) {
    respond(false, 'Message is too long.', 400);
}

$subject = "Placekeep inquiry: $type";
$body  = "Inquiry type: $type\n";
if ($name !== '') $body .= "Name: $name\n";
if ($org  !== '') $body .= "Organization: $org\n";
$body .= "Email: $email\n\nMessage:\n$message\n";

$headers = [
    'From'         => $FROM,
    'Reply-To'     => $email,   // client can just hit Reply
    'Content-Type' => 'text/plain; charset=UTF-8',
];

if (mail($TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers)) {
    respond(true, '');
}
respond(false, 'Sorry, something went wrong sending your message. Please try again later.', 500);