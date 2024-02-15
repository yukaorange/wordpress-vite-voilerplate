<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta name="theme-color" content="#FFFFFF">
  <?php wp_head(); ?>
</head>

<body class="body">
  <?php wp_body_open(); ?>
  <header class="header" id="header">
    <div class="header_wrapper">
      <div class="header_inner">
        <div class="header_logo logo">
          <a href="<?php echo esc_url(home_url()); ?>">
            <!-- <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt=""> -->
          </a>
        </div>
        <?php
        // get_template_part("template-part//component/global-nav");
        ?>
      </div>
    </div>
  </header>
  <?php
  get_template_part("template-part//component/drawer-nav");
  ?>
  <?php
  get_template_part("template-part/component/drawer-button");
  ?>
  <?php get_template_part("template-part/common/common-loading"); ?>