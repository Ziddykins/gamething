<?php
    declare(strict_types = 1);
    session_start();
    require '../../../vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->safeLoad();

    include 'logger.php';
    require_once 'db.php';
    include 'constants.php';
    include 'functions.php';
    
    if (isset($_REQUEST['code']) && isset($_REQUEST['email'])) {
        $verification_code = $_REQUEST['code'];
        $email             = $_REQUEST['email'];
        
        $sql_query = "SELECT * FROM {$_ENV['SQL_ACCT_TBL']} WHERE `verification_code` = ? AND `email` = ?";
        $results = $db->execute_query($sql_query, [ $verification_code, $email ]);   
        
        
        /* 
            Player found with matching verification code,
            set privileges to a registered user
        */
        if ($results->num_rows) {
            $account = $results->fetch_assoc();
            $current_privs = UserPrivileges::name_to_value($account['privileges']);
            
            if ($account['verified'] === 'True' || $privs >= UserPrivileges::USER) {
                $query_path = "/?already_verified=1&email={$account['email']}";
                header("Location: $query_path");
                exit();
            }

            $sql_query = "UPDATE {$_ENV['SQL_ACCT_TBL']} SET `privileges` = '" . UserPrivileges::USER->name . "', `verified` = 'True' WHERE `id` = {$account['id']}";
            $db->execute_query($sql_query);            
            $log->info("User verification successful",
                        [
                            'User' => $account['email'],
                            'Code' => $account['verification_code']
                        ]
            );

            header('Location: /?verification_successful');
            exit();
        } else {
            header('Location: /?verification_failed');
            exit();
        }
    }
