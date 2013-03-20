@api
@post
Feature: Posts API
  As an anonymous or logged in user
  The Blog should
  Provide an interface for interacting with posts

  Background: Headers
    Given the following posts exist
      | id | title | body     | teaser |
      | 1  | One   | Text 1   | T1     |
      | 2  | Two   | Text 2   | T2     |
    When I send and accept JSON

  Scenario: Index action
    When I send a GET request to "/posts"
    Then the response status should be "200"
    And the JSON response should have "$.meta.total" with the text "2"
    And the JSON response should have "$.posts[*]" with a length of 2
    And the JSON response should have "$..posts[1].title" with the text "One"
    And the JSON response should have "$..posts[1].body" with the text "Text 1"
    And the JSON response should have "$..posts[1].teaser" with the text "T1"
    And I pause for a second

  Scenario: View action
    When I send a GET request to "/posts/1"
    Then the response status should be "200"
    And the JSON response should have "$.post.title" with the text "One"
    And the JSON response should have "$.post.body" with the text "Text 1"
    And the JSON response should have "$.post.teaser" with the text "T1"

  Scenario Outline: successful post creation
    When I send a POST request to "/posts" with the following:
      """
      {"title":"<title>","body":"<body>","teaser":"<teaser>","tag_list":"<tag_list>","user_id":"<user_id>"}
      """
    Then the response status should be "201"
    When I request the newly created resource
    Then the response status should be "200"
    And the JSON response should have "$.post.title" with the text "<title>"
    And the JSON response should have "$.post.body" with the text "<body>"
    And the JSON response should have "$.post.teaser" with the text "<teaser>"

    Examples:
      | title | body                          | teaser      | tag_list    | user_id |
      | New 1 | Nothing else matters ...      | Nothing     | bla, blubb  | 1       |
      | New 2 | That's how you test properly  | That's how  | blubb, bumm | 2       |

  Scenario Outline: unsuccessful post creation
    When I send a POST request to "/posts" with the following:
      """
      {"title":"<title>","body":"<body>","teaser":"<teaser>","tag_list":"<tag_list>","user_id":"<user_id>"}
      """
    Then the response status should be "422"
    And the JSON response should have "$.<key>" with a length of 1

    Examples:
      | title   | body                          | teaser      | tag_list    | user_id | key   |
      |         | I fail without title          | Nothing     | bla, blubb  | 1       | title |
      | nothing |                               | Nothing     | bla, blubb  | 1       | body  |
      |         |                               | Nothing     | bla, blubb  | 1       | title |
      |         |                               | Nothing     | bla, blubb  | 1       | body  |

  Scenario Outline: successful post change
    When I send a PUT request to "/posts/<id>" with the following:
      """
      {"title":"<title>","body":"<body>","teaser":"<teaser>","tag_list":"<tag_list>","user_id":"<user_id>"}
      """
    Then the response status should be "204"
    When I send a GET request to "/posts/<id>"
    Then the response status should be "200"
    And the JSON response should have "$.post.title" with the text "<title>"
    And the JSON response should have "$.post.body" with the text "<body>"
    And the JSON response should have "$.post.teaser" with the text "<teaser>"

    Examples:
      |id | title | body                          | teaser      | tag_list    | user_id |
      | 1 | New 1 | Text 1                        | T1          | bla, blubb  | 3       |
      | 2 | Two   | That's how you test properly  | That's how  | blubb, bumm | 2       |

  Scenario Outline: unsuccessful post changes
    When I send a PUT request to "/posts/1" with the following:
      """
      {"title":"<title>","body":"<body>","teaser":"<teaser>","tag_list":"<tag_list>","user_id":"<user_id>"}
      """
    Then the response status should be "422"
    And the JSON response should have "$.<key>" with a length of 1

    Examples:
      | title   | body                          | teaser      | tag_list    | user_id | key   |
      |         | I fail without title          | Nothing     | bla, blubb  | 1       | title |
      | nothing |                               | Nothing     | bla, blubb  | 1       | body  |
      |         |                               | Nothing     | bla, blubb  | 1       | title |
      |         |                               | Nothing     | bla, blubb  | 1       | body  |

  @allow-rescue
  Scenario: Delete posts
    When I send a DELETE request to "/posts/1"
    Then the response status should be "204"
    When I am simulating a remote request
    Then I send a GET request to "/posts/1"
    Then the response status should be "404"