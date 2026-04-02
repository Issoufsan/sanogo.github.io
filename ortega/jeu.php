<?php
session_start();
include 'personnages.php';

if (!isset($_SESSION['remaining'])) {
    $_SESSION['remaining'] = array_keys($personnages);
    $_SESSION['asked'] = [];
}

$remaining = $_SESSION['remaining'];
$asked = $_SESSION['asked'];

$message = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $question = $_POST['question'];
    $answer_text = $_POST['answer']; // 'Oui' or 'Non'
    $answer = ($answer_text == 'Oui') ? 1 : 0;
    $asked[] = $question;
    $_SESSION['asked'] = $asked;

    // Filter remaining
    $new_remaining = [];
    foreach ($remaining as $id) {
        if ($personnages[$id][$question] == $answer) {
            $new_remaining[] = $id;
        }
    }
    $remaining = $new_remaining;
    $_SESSION['remaining'] = $remaining;
}

if (count($remaining) == 1) {
    $message = 'Je pense que c\'est ' . $personnages[$remaining[0]]['nom'] . '!';
    // Reset for new game
    unset($_SESSION['remaining']);
    unset($_SESSION['asked']);
} elseif (count($remaining) == 0) {
    $message = 'Erreur: aucun personnage ne correspond.';
    unset($_SESSION['remaining']);
    unset($_SESSION['asked']);
} else {
    // Choose best question
    $best_question = null;
    $best_split = PHP_INT_MAX;
    foreach ($questions as $attr => $q) {
        if (in_array($attr, $asked)) continue;
        $yes = 0;
        foreach ($remaining as $id) {
            if ($personnages[$id][$attr]) $yes++;
        }
        $no = count($remaining) - $yes;
        $split = abs($yes - $no);
        if ($split < $best_split) {
            $best_split = $split;
            $best_question = $attr;
        }
    }
    if ($best_question) {
        $current_question = $questions[$best_question];
        $question_attr = $best_question;
    } else {
        $message = 'Plus de questions disponibles.';
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Qui est-ce ?</title>
    <link rel="stylesheet" href="style_jeu.css">
</head>
<body>
    <h1>Qui est-ce ?</h1>
    <div id="main">
        <p>Personnages restants: <?php echo count($remaining); ?></p>
        <table id="tableau">
            <tbody>
                <?php
                $rows = [
                    [8,2,12,3,7,13],
                    [null,9,10,11,14,null],
                    [1,4,5,0,15,6]
                ];
                foreach ($rows as $row) {
                    echo '<tr>';
                    foreach ($row as $id) {
                        if ($id === null) {
                            echo '<td></td>';
                        } else {
                            $class = in_array($id, $remaining) ? 'normal' : 'hidden';
                            echo '<td class="' . $class . '" id="' . $id . '" style="width: 141px; height: 248px; background-image: url(\'images/' . $id . '.jpg\');"></td>';
                        }
                    }
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>
        <br>
        <?php if ($message): ?>
            <h2><?php echo $message; ?></h2>
            <form method="post">
                <input type="submit" value="Rejouer">
            </form>
        <?php elseif (isset($current_question)): ?>
            <h2><?php echo $current_question; ?></h2>
            <form method="post">
                <input type="hidden" name="question" value="<?php echo $question_attr; ?>">
                <input type="submit" name="answer" value="Oui" formaction="?">
                <input type="submit" name="answer" value="Non" formaction="?">
            </form>
        <?php endif; ?>
    </div>
</body>
</html>