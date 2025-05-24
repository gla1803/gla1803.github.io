<?php
header('Content-Type: application/json');

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Метод не разрешен']);
    exit;
}

// Получение и очистка данных
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Валидация
$errors = [];
if (empty($name)) $errors['name'] = 'Введите имя';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Введите корректный email';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['error' => 'Ошибка валидации', 'errors' => $errors]);
    exit;
}

// Настройки письма
$to = 'lavrentiy.gabrielyan@gmail.com';
$subject = "Новое сообщение с сайта от {$name}";
$body = "Имя: {$name}\nEmail: {$email}\n\nСообщение:\n{$message}";
$headers = [
    'From' => $email,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=utf-8'
];

// Форматирование заголовков
$headersStr = '';
foreach ($headers as $key => $value) {
    $headersStr .= "{$key}: {$value}\r\n";
}

// Логирование
file_put_contents('mail_log.txt', date('Y-m-d H:i:s') . " - Попытка отправки на {$to}\n", FILE_APPEND);

try {
    // Отправка письма
    $mailSent = mail($to, $subject, $body, $headersStr);
    
    if ($mailSent) {
        file_put_contents('mail_log.txt', "Успешно отправлено\n", FILE_APPEND | FILE_APPEND);
        echo json_encode(['success' => 'Сообщение успешно отправлено!']);
    } else {
        throw new Exception('Ошибка функции mail()');
    }
} catch (Exception $e) {
    file_put_contents('mail_log.txt', "Ошибка: " . $e->getMessage() . "\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(['error' => 'Не удалось отправить сообщение. Пожалуйста, попробуйте позже.']);
}
?>