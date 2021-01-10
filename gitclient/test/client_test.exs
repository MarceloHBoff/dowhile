defmodule Gitclient.ClientTest do
    use ExUnit.Case

    import Tesla.Mock

    describe "get_repos/1" do
        test "When the user has repos, returns the repos" do
            username = "MarceloHBoff"

            response = [
                %{"id" => 1, "name" => "my repo 1"},
                %{"id" => 2, "name" => "my repo 2"}
            ]

            expected_response = {:ok, response}

            mock(fn %{method: :get, url: "https://api.github.com/users/MarceloHBoff/repos"} -> 
                %Tesla.Env{status: 200, body: response} 
            end)

            assert Gitclient.Client.get_repos(username) == expected_response
        end
        
        test "When the user was not found, returns an error" do
            username = "MarceloHBoff"
            
            expected_response = {:error, "User not found"}
            
            mock(fn %{method: :get, url: "https://api.github.com/users/MarceloHBoff/repos"} -> 
                %Tesla.Env{status: 404, body: ""} 
            end)
            
            assert Gitclient.Client.get_repos(username) == expected_response
        end
    end
end